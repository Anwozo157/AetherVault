# AetherVault Azure Site Recovery collector: a Function app (Flex Consumption) in the customer's
# subscription that reads ONE Recovery Services vault every minute and pushes status to AetherVault.
#
#   npm run collector:azure:package           # builds dist-collector-azure/function/function.zip
#   terraform init -backend-config=<private backend .hcl>   # remote state: it holds the ingest token
#   terraform plan -out tfplan && terraform apply tfplan
#   then deploy the zip:  az functionapp deployment source config-zip -g <rg> -n <app> --src <zip>
#
# Permissions: the app's system-assigned identity gets only the built-in "Site Recovery Reader"
# role, scoped to the vault. Cost: one run a minute (~43,200 a month) sits inside the Flex
# Consumption monthly free grant; the storage account costs cents. No Application Insights.

terraform {
  # Partial backend: values come from a private -backend-config file (never in git).
  # CI validates with -backend=false.
  backend "azurerm" {}

  required_version = ">= 1.9"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}

provider "azurerm" {
  subscription_id     = var.subscription_id
  storage_use_azuread = true
  features {}
}

variable "subscription_id" {
  type        = string
  description = "Subscription that holds the vault."
}

variable "resource_group_name" {
  type        = string
  description = "Existing resource group for the collector (e.g. the vault's)."
}

variable "location" {
  type        = string
  description = "Region for the Function app; the vault's region keeps traffic local."
}

variable "vault_id" {
  type        = string
  description = "Resource ID of the Recovery Services vault to read."
  validation {
    condition     = can(regex("(?i)^/subscriptions/[^/]+/resourceGroups/[^/]+/providers/Microsoft\\.RecoveryServices/vaults/[^/]+$", var.vault_id))
    error_message = "vault_id must be a Recovery Services vault resource ID."
  }
}

variable "vault_region" {
  type        = string
  description = "Region the vault (the recovery side) is in, e.g. westus2."
}

variable "aethervault_url" {
  type        = string
  description = "AetherVault API URL (Supabase project URL)."
}

variable "aethervault_anon_key" {
  type        = string
  description = "AetherVault public anon key."
}

variable "ingest_token" {
  type        = string
  sensitive   = true
  description = "Collector token from the console (avi_...). Lands in state: use remote state."
  validation {
    condition     = can(regex("^avi_[0-9a-f]{48}$", var.ingest_token))
    error_message = "ingest_token must be an AetherVault collector token (avi_...)."
  }
}

variable "tags" {
  type    = map(string)
  default = { project = "aethervault", component = "azure-collector" }
}

resource "random_string" "suffix" {
  length  = 6
  upper   = false
  special = false
}

# Deployment package storage for Flex Consumption. Key access off; the app reaches it with its
# managed identity.
resource "azurerm_storage_account" "collector" {
  name                            = "avcollector${random_string.suffix.result}"
  resource_group_name             = var.resource_group_name
  location                        = var.location
  account_tier                    = "Standard"
  account_replication_type        = "LRS"
  min_tls_version                 = "TLS1_2"
  shared_access_key_enabled       = false
  allow_nested_items_to_be_public = false
  tags                            = var.tags
}

resource "azurerm_storage_container" "deploy" {
  name                  = "deploy"
  storage_account_id    = azurerm_storage_account.collector.id
  container_access_type = "private"
}

resource "azurerm_service_plan" "collector" {
  name                = "asp-aethervault-collector"
  resource_group_name = var.resource_group_name
  location            = var.location
  os_type             = "Linux"
  sku_name            = "FC1"
  tags                = var.tags
}

resource "azurerm_function_app_flex_consumption" "collector" {
  name                = "func-aethervault-collector-${random_string.suffix.result}"
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = azurerm_service_plan.collector.id

  storage_container_type      = "blobContainer"
  storage_container_endpoint  = "${azurerm_storage_account.collector.primary_blob_endpoint}${azurerm_storage_container.deploy.name}"
  storage_authentication_type = "SystemAssignedIdentity"

  runtime_name           = "node"
  runtime_version        = "20"
  maximum_instance_count = 40
  instance_memory_in_mb  = 512
  https_only             = true

  identity {
    type = "SystemAssigned"
  }

  site_config {}

  app_settings = {
    AZURE_VAULT_ID           = var.vault_id
    AZURE_VAULT_REGION       = var.vault_region
    AETHERVAULT_URL          = var.aethervault_url
    AETHERVAULT_ANON_KEY     = var.aethervault_anon_key
    AETHERVAULT_INGEST_TOKEN = var.ingest_token
  }

  tags = var.tags
}

# Read-only on the one vault: replication status and jobs, nothing else.
resource "azurerm_role_assignment" "vault_reader" {
  scope                = var.vault_id
  role_definition_name = "Site Recovery Reader"
  principal_id         = azurerm_function_app_flex_consumption.collector.identity[0].principal_id
}

# The app pulls its own deployment package.
resource "azurerm_role_assignment" "deploy_blob" {
  scope                = azurerm_storage_account.collector.id
  role_definition_name = "Storage Blob Data Owner"
  principal_id         = azurerm_function_app_flex_consumption.collector.identity[0].principal_id
}

output "function_app_name" {
  value = azurerm_function_app_flex_consumption.collector.name
}

output "deploy_command" {
  value = "az functionapp deployment source config-zip -g ${var.resource_group_name} -n ${azurerm_function_app_flex_consumption.collector.name} --src dist-collector-azure/function/function.zip"
}
