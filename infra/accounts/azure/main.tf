# AetherVault Azure account baseline: applied ONCE per subscription, by the founder's signed-in
# session (`az login`), before any test resource exists. It sets the guardrails every later
# Azure test runs inside:
#
#   * budget alerts (actual and forecast) at the founder-approved caps: $10 and $25
#   * Azure Policy: resources only in the two test regions; VMs only in small, cheap sizes
#   * resource groups for the test (source and target region), tagged for teardown checks
#   * an optional Terraform state storage account (no shared keys, versioned, private)
#
# It creates no compute and costs nothing by itself. Budgets ALERT; they never stop spending.
# On the free account the spending limit is the hard stop; never upgrade without the founder.
#
# Usage: see README.md in this folder.

terraform {
  # Remote state in the private storage account from infra/accounts/azure (Entra ID only, no
  # account keys, versioned). Settings live outside the repo:
  #   terraform init -backend-config=~/Developer/AegisCoreLabs-private/azure-poc/backend-accounts.hcl
  # CI validates with -backend=false and needs no credentials.
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
  # From provider 4.0 the subscription must be explicit: ARM_SUBSCRIPTION_ID or this variable.
  subscription_id = var.subscription_id
  # Authenticates with the founder's Azure CLI session (`az login`); no secrets on disk.
  features {
    storage {
      # The state account disables shared keys. Without this, the provider reads queue and
      # static-website settings through the storage data plane with account keys and gets 403
      # (KeyBasedAuthenticationNotPermitted). Everything here is managed through Azure Resource Manager.
      data_plane_available = false
    }
  }
}

# ---------------------------------------------------------------------------
# Inputs
# ---------------------------------------------------------------------------
variable "subscription_id" {
  description = "Azure subscription to configure (keep the real value in terraform.tfvars, never committed)."
  type        = string
}

variable "alert_emails" {
  description = "Who receives budget alerts."
  type        = list(string)
}

variable "budget_amounts" {
  description = "Monthly budget alert levels in USD (founder-approved: 10 and 25)."
  type        = list(number)
  default     = [10, 25]
}

variable "budget_start" {
  description = "First day of the budget month, RFC 3339 (must be the first of a month)."
  type        = string
  default     = "2026-11-01T00:00:00Z"
}

variable "source_location" {
  description = "Region the test server runs in."
  type        = string
  default     = "northcentralus"
}

variable "target_location" {
  description = "Region Site Recovery replicates into."
  type        = string
  default     = "westus2"
}

variable "allowed_vm_sizes" {
  description = "The only VM sizes the subscription may create (small burstable sizes)."
  type        = list(string)
  default     = ["Standard_B1s", "Standard_B2ats_v2", "Standard_B2s"]
}

variable "create_state_storage" {
  description = "Create a private storage account for Terraform state (recommended before collectors hold tokens)."
  type        = bool
  default     = true
}

variable "tags" {
  description = "Tags on everything this creates."
  type        = map(string)
  default = {
    project = "aethervault"
    env     = "poc"
    owner   = "agent"
  }
}

data "azurerm_subscription" "current" {}
data "azurerm_client_config" "current" {}

locals {
  allowed_locations = distinct([var.source_location, var.target_location])
}

# ---------------------------------------------------------------------------
# Budgets: alerts only. Cost data lags 8-24 h; the agent's own estimate is the real-time guard.
# ---------------------------------------------------------------------------
resource "azurerm_consumption_budget_subscription" "caps" {
  for_each        = { for a in var.budget_amounts : tostring(a) => a }
  name            = "aethervault-budget-${each.key}usd"
  subscription_id = data.azurerm_subscription.current.id
  amount          = each.value
  time_grain      = "Monthly"

  time_period {
    start_date = var.budget_start
  }

  notification {
    enabled        = true
    operator       = "GreaterThanOrEqualTo"
    threshold      = 100
    threshold_type = "Actual"
    contact_emails = var.alert_emails
  }

  notification {
    enabled        = true
    operator       = "GreaterThanOrEqualTo"
    threshold      = 100
    threshold_type = "Forecasted"
    contact_emails = var.alert_emails
  }
}

# ---------------------------------------------------------------------------
# Guardrail policies (built-in definitions; IDs from Microsoft's built-in policy list)
# ---------------------------------------------------------------------------
resource "azurerm_subscription_policy_assignment" "allowed_locations" {
  name                 = "aethervault-allowed-locations"
  display_name         = "AetherVault: resources only in the test regions"
  subscription_id      = data.azurerm_subscription.current.id
  policy_definition_id = "/providers/Microsoft.Authorization/policyDefinitions/e56962a6-4747-49cd-b67b-bf8b01975c4c"
  parameters = jsonencode({
    listOfAllowedLocations = { value = local.allowed_locations }
  })
  non_compliance_message {
    content = "AetherVault test subscription: only ${join(", ", local.allowed_locations)} are allowed."
  }
}

resource "azurerm_subscription_policy_assignment" "allowed_vm_sizes" {
  name                 = "aethervault-allowed-vm-sizes"
  display_name         = "AetherVault: small VM sizes only"
  subscription_id      = data.azurerm_subscription.current.id
  policy_definition_id = "/providers/Microsoft.Authorization/policyDefinitions/cccc23c7-8427-4f53-ad12-b6a63eb452b3"
  parameters = jsonencode({
    listOfAllowedSKUs = { value = var.allowed_vm_sizes }
  })
  non_compliance_message {
    content = "AetherVault test subscription: VM sizes limited to ${join(", ", var.allowed_vm_sizes)}."
  }
}

# ---------------------------------------------------------------------------
# Resource groups for the live test (the test itself lives in infra/poc/azure)
# ---------------------------------------------------------------------------
resource "azurerm_resource_group" "source" {
  name     = "rg-aethervault-poc-source"
  location = var.source_location
  tags     = var.tags
}

resource "azurerm_resource_group" "target" {
  name     = "rg-aethervault-poc-target"
  location = var.target_location
  tags     = var.tags
}

# ---------------------------------------------------------------------------
# Terraform state storage: private, Entra ID access only, versioned
# ---------------------------------------------------------------------------
resource "azurerm_resource_group" "state" {
  count    = var.create_state_storage ? 1 : 0
  name     = "rg-aethervault-tfstate"
  location = var.source_location
  tags     = merge(var.tags, { env = "shared" })
}

resource "random_string" "state_suffix" {
  count   = var.create_state_storage ? 1 : 0
  length  = 6
  upper   = false
  special = false
}

resource "azurerm_storage_account" "state" {
  count                           = var.create_state_storage ? 1 : 0
  name                            = "aethervaulttf${random_string.state_suffix[0].result}"
  resource_group_name             = azurerm_resource_group.state[0].name
  location                        = azurerm_resource_group.state[0].location
  account_tier                    = "Standard"
  account_replication_type        = "LRS"
  min_tls_version                 = "TLS1_2"
  https_traffic_only_enabled      = true
  allow_nested_items_to_be_public = false
  shared_access_key_enabled       = false
  default_to_oauth_authentication = true
  tags                            = merge(var.tags, { env = "shared" })

  blob_properties {
    versioning_enabled = true
    delete_retention_policy {
      days = 30
    }
    container_delete_retention_policy {
      days = 30
    }
  }
}

resource "azurerm_storage_container" "state" {
  count                 = var.create_state_storage ? 1 : 0
  name                  = "tfstate"
  storage_account_id    = azurerm_storage_account.state[0].id
  container_access_type = "private"
}

# The signed-in founder reads and writes state through Entra ID (no account keys).
resource "azurerm_role_assignment" "state_writer" {
  count                = var.create_state_storage ? 1 : 0
  scope                = azurerm_storage_account.state[0].id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = data.azurerm_client_config.current.object_id
}

# ---------------------------------------------------------------------------
# Outputs (no secrets)
# ---------------------------------------------------------------------------
output "source_resource_group" {
  value = azurerm_resource_group.source.name
}

output "target_resource_group" {
  value = azurerm_resource_group.target.name
}

output "allowed_locations" {
  value = local.allowed_locations
}

output "state_storage_account" {
  value = var.create_state_storage ? azurerm_storage_account.state[0].name : null
}
