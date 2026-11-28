# AetherVault Azure live test (Azure-to-Azure Site Recovery), the Azure counterpart of the AWS
# test in docs/AWS_LIVE_POC.md. Driven by scripts/poc/azure-source.sh; don't apply by hand.
#
#   up                  -> source server + networks (enable_replication = false)
#   enable-replication  -> vault, fabrics, containers, policy, mappings, replicated VM
#   down                -> everything destroyed; leftovers listed by tag
#
# Shape (cheapest honest test):
#   source region (northcentralus)             target region (westus2)
#   ┌──────────────────────────────┐           ┌─────────────────────────────────────────┐
#   │ VNet 10.10/16                │  Site     │ Recovery Services vault (not in source)  │
#   │  VM: Ubuntu 24.04, B2ats_v2, │ Recovery  │ VNet 10.20/16  (failover network)        │
#   │  PostgreSQL, 1 row/second    │ ────────▶ │ VNet 10.30/16  (isolated drill network)  │
#   │  no inbound ports            │  (A2A)    │ replica disks (ASR creates, -ASRReplica) │
#   │ cache storage account        │           └─────────────────────────────────────────┘
#   └──────────────────────────────┘
#
# Requires infra/accounts/azure applied first (resource groups, budgets, region/size policies).
# Cost: see docs/MULTICLOUD_ACCOUNT_SETUP.md. Site Recovery is free for 31 days per VM, then
# $25/month: tear down inside 31 days.

terraform {
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
  subscription_id = var.subscription_id
  features {
    resource_group {
      # The resource groups belong to infra/accounts/azure; never delete them from here.
      prevent_deletion_if_contains_resources = true
    }
  }
}

# ---------------------------------------------------------------------------
# Inputs
# ---------------------------------------------------------------------------
variable "subscription_id" {
  type = string
}

variable "source_resource_group" {
  type    = string
  default = "rg-aethervault-poc-source"
}

variable "target_resource_group" {
  type    = string
  default = "rg-aethervault-poc-target"
}

variable "vm_size" {
  description = "Must be allowed by the account policy. B2ats_v2 is in the free account's 750 free hours."
  type        = string
  default     = "Standard_B2ats_v2"
}

variable "admin_username" {
  type    = string
  default = "aethervault"
}

variable "ssh_public_key" {
  description = "Public half of a throwaway key (azure-source.sh makes one in the private folder). No inbound port is open; it is never used to log in. Commands go through Azure Run Command."
  type        = string
}

variable "enable_replication" {
  description = "false: source server only. true: Site Recovery protects it into the target region."
  type        = bool
  default     = false
}

variable "auto_shutdown_time" {
  description = "Daily time (HHMM, US Eastern) the source VM is deallocated, a safety net like the AWS self-terminate. Empty string turns it off (azure-source.sh asks first)."
  type        = string
  default     = "2300"
}

variable "alert_email" {
  description = "Notified 30 minutes before the daily auto-shutdown."
  type        = string
  default     = ""
}

variable "expires" {
  description = "Date (YYYY-MM-DD) by which everything must be torn down (inside the 31 free Site Recovery days)."
  type        = string
}

locals {
  tags = {
    project = "aethervault"
    env     = "poc"
    owner   = "agent"
    expires = var.expires
  }
}

data "azurerm_resource_group" "source" {
  name = var.source_resource_group
}

data "azurerm_resource_group" "target" {
  name = var.target_resource_group
}

# ---------------------------------------------------------------------------
# Source region: network and server
# ---------------------------------------------------------------------------
resource "azurerm_virtual_network" "source" {
  name                = "vnet-aethervault-source"
  location            = data.azurerm_resource_group.source.location
  resource_group_name = data.azurerm_resource_group.source.name
  address_space       = ["10.10.0.0/16"]
  tags                = local.tags
}

resource "azurerm_subnet" "source" {
  name                 = "snet-app"
  resource_group_name  = data.azurerm_resource_group.source.name
  virtual_network_name = azurerm_virtual_network.source.name
  address_prefixes     = ["10.10.1.0/24"]
}

# No inbound rules at all: Azure's defaults deny inbound from the internet. Outbound stays open
# for package installs and Site Recovery (storage, Entra ID, replication service endpoints).
resource "azurerm_network_security_group" "source" {
  name                = "nsg-aethervault-source"
  location            = data.azurerm_resource_group.source.location
  resource_group_name = data.azurerm_resource_group.source.name
  tags                = local.tags
}

resource "azurerm_subnet_network_security_group_association" "source" {
  subnet_id                 = azurerm_subnet.source.id
  network_security_group_id = azurerm_network_security_group.source.id
}

# A public IP gives the server explicit outbound internet (new subnets may get no default
# outbound access). Inbound is still blocked by the NSG.
resource "azurerm_public_ip" "source" {
  name                = "pip-aethervault-source"
  location            = data.azurerm_resource_group.source.location
  resource_group_name = data.azurerm_resource_group.source.name
  allocation_method   = "Static"
  sku                 = "Standard"
  tags                = local.tags
}

resource "azurerm_network_interface" "source" {
  name                = "nic-aethervault-source"
  location            = data.azurerm_resource_group.source.location
  resource_group_name = data.azurerm_resource_group.source.name
  tags                = local.tags

  ip_configuration {
    name                          = "primary"
    subnet_id                     = azurerm_subnet.source.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.source.id
  }
}

resource "azurerm_linux_virtual_machine" "source" {
  name                            = "vm-aethervault-source"
  location                        = data.azurerm_resource_group.source.location
  resource_group_name             = data.azurerm_resource_group.source.name
  size                            = var.vm_size
  admin_username                  = var.admin_username
  disable_password_authentication = true
  network_interface_ids           = [azurerm_network_interface.source.id]
  custom_data                     = base64encode(file("${path.module}/cloud-init.yaml"))
  tags                            = local.tags

  admin_ssh_key {
    username   = var.admin_username
    public_key = var.ssh_public_key
  }

  os_disk {
    name                 = "osdisk-aethervault-source"
    caching              = "ReadWrite"
    storage_account_type = "StandardSSD_LRS"
    disk_size_gb         = 32
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "ubuntu-24_04-lts"
    sku       = "server"
    version   = "latest"
  }

  # Encryption at host and managed-disk encryption with platform keys are the Azure defaults;
  # Site Recovery doesn't support Azure Disk Encryption here without extra setup, so none is added.
  boot_diagnostics {}
}

resource "azurerm_dev_test_global_vm_shutdown_schedule" "source" {
  count                 = var.auto_shutdown_time == "" ? 0 : 1
  virtual_machine_id    = azurerm_linux_virtual_machine.source.id
  location              = data.azurerm_resource_group.source.location
  enabled               = true
  daily_recurrence_time = var.auto_shutdown_time
  timezone              = "Eastern Standard Time"
  tags                  = local.tags

  notification_settings {
    enabled         = var.alert_email != ""
    email           = var.alert_email == "" ? null : var.alert_email
    time_in_minutes = 30
  }
}

# Cache storage for Site Recovery: in the source region, same subscription, no soft delete.
resource "random_string" "cache" {
  length  = 8
  upper   = false
  special = false
}

resource "azurerm_storage_account" "cache" {
  count                           = var.enable_replication ? 1 : 0
  name                            = "aethervaultasr${random_string.cache.result}"
  resource_group_name             = data.azurerm_resource_group.source.name
  location                        = data.azurerm_resource_group.source.location
  account_kind                    = "StorageV2"
  account_tier                    = "Standard"
  account_replication_type        = "LRS"
  min_tls_version                 = "TLS1_2"
  https_traffic_only_enabled      = true
  allow_nested_items_to_be_public = false
  tags                            = local.tags
}

# ---------------------------------------------------------------------------
# Target region: failover network and an isolated drill network (no peering, no gateway)
# ---------------------------------------------------------------------------
resource "azurerm_virtual_network" "target" {
  name                = "vnet-aethervault-recovery"
  location            = data.azurerm_resource_group.target.location
  resource_group_name = data.azurerm_resource_group.target.name
  address_space       = ["10.20.0.0/16"]
  tags                = local.tags
}

resource "azurerm_subnet" "target" {
  name                 = "snet-app"
  resource_group_name  = data.azurerm_resource_group.target.name
  virtual_network_name = azurerm_virtual_network.target.name
  address_prefixes     = ["10.20.1.0/24"]
}

resource "azurerm_virtual_network" "drill" {
  name                = "vnet-aethervault-drill"
  location            = data.azurerm_resource_group.target.location
  resource_group_name = data.azurerm_resource_group.target.name
  address_space       = ["10.30.0.0/16"]
  tags                = local.tags
}

resource "azurerm_subnet" "drill" {
  name                 = "snet-app"
  resource_group_name  = data.azurerm_resource_group.target.name
  virtual_network_name = azurerm_virtual_network.drill.name
  address_prefixes     = ["10.30.1.0/24"]
}

# ---------------------------------------------------------------------------
# Site Recovery (only when enable_replication = true)
# ---------------------------------------------------------------------------
resource "azurerm_recovery_services_vault" "asr" {
  count               = var.enable_replication ? 1 : 0
  name                = "rsv-aethervault-poc"
  location            = data.azurerm_resource_group.target.location # never the source region
  resource_group_name = data.azurerm_resource_group.target.name
  sku                 = "Standard"
  storage_mode_type   = "LocallyRedundant"
  # Soft delete is always on (Azure secure-by-default); it covers backup items, which this test
  # never creates, so the vault still deletes cleanly at teardown.
  tags = local.tags
}

resource "azurerm_site_recovery_fabric" "primary" {
  count               = var.enable_replication ? 1 : 0
  name                = "fabric-primary"
  resource_group_name = data.azurerm_resource_group.target.name
  recovery_vault_name = azurerm_recovery_services_vault.asr[0].name
  location            = data.azurerm_resource_group.source.location
}

resource "azurerm_site_recovery_fabric" "secondary" {
  count               = var.enable_replication ? 1 : 0
  name                = "fabric-secondary"
  resource_group_name = data.azurerm_resource_group.target.name
  recovery_vault_name = azurerm_recovery_services_vault.asr[0].name
  location            = data.azurerm_resource_group.target.location
  depends_on          = [azurerm_site_recovery_fabric.primary] # ASR serializes fabric creation
}

resource "azurerm_site_recovery_protection_container" "primary" {
  count                = var.enable_replication ? 1 : 0
  name                 = "container-primary"
  resource_group_name  = data.azurerm_resource_group.target.name
  recovery_vault_name  = azurerm_recovery_services_vault.asr[0].name
  recovery_fabric_name = azurerm_site_recovery_fabric.primary[0].name
}

resource "azurerm_site_recovery_protection_container" "secondary" {
  count                = var.enable_replication ? 1 : 0
  name                 = "container-secondary"
  resource_group_name  = data.azurerm_resource_group.target.name
  recovery_vault_name  = azurerm_recovery_services_vault.asr[0].name
  recovery_fabric_name = azurerm_site_recovery_fabric.secondary[0].name
}

# Microsoft's defaults: 1 day of recovery points; app-consistent snapshots off (crash-consistent
# points every 5 minutes are fixed and can't be changed).
resource "azurerm_site_recovery_replication_policy" "policy" {
  count                                                = var.enable_replication ? 1 : 0
  name                                                 = "policy-aethervault-1day"
  resource_group_name                                  = data.azurerm_resource_group.target.name
  recovery_vault_name                                  = azurerm_recovery_services_vault.asr[0].name
  recovery_point_retention_in_minutes                  = 24 * 60
  application_consistent_snapshot_frequency_in_minutes = 0
}

resource "azurerm_site_recovery_protection_container_mapping" "mapping" {
  count                                     = var.enable_replication ? 1 : 0
  name                                      = "mapping-primary-to-secondary"
  resource_group_name                       = data.azurerm_resource_group.target.name
  recovery_vault_name                       = azurerm_recovery_services_vault.asr[0].name
  recovery_fabric_name                      = azurerm_site_recovery_fabric.primary[0].name
  recovery_source_protection_container_name = azurerm_site_recovery_protection_container.primary[0].name
  recovery_target_protection_container_id   = azurerm_site_recovery_protection_container.secondary[0].id
  recovery_replication_policy_id            = azurerm_site_recovery_replication_policy.policy[0].id
}

resource "azurerm_site_recovery_network_mapping" "network" {
  count                       = var.enable_replication ? 1 : 0
  name                        = "network-mapping"
  resource_group_name         = data.azurerm_resource_group.target.name
  recovery_vault_name         = azurerm_recovery_services_vault.asr[0].name
  source_recovery_fabric_name = azurerm_site_recovery_fabric.primary[0].name
  target_recovery_fabric_name = azurerm_site_recovery_fabric.secondary[0].name
  source_network_id           = azurerm_virtual_network.source.id
  target_network_id           = azurerm_virtual_network.target.id
}

resource "azurerm_site_recovery_replicated_vm" "source" {
  count                                     = var.enable_replication ? 1 : 0
  name                                      = "vm-aethervault-source"
  resource_group_name                       = data.azurerm_resource_group.target.name
  recovery_vault_name                       = azurerm_recovery_services_vault.asr[0].name
  source_recovery_fabric_name               = azurerm_site_recovery_fabric.primary[0].name
  source_vm_id                              = azurerm_linux_virtual_machine.source.id
  recovery_replication_policy_id            = azurerm_site_recovery_replication_policy.policy[0].id
  source_recovery_protection_container_name = azurerm_site_recovery_protection_container.primary[0].name
  target_resource_group_id                  = data.azurerm_resource_group.target.id
  target_recovery_fabric_id                 = azurerm_site_recovery_fabric.secondary[0].id
  target_recovery_protection_container_id   = azurerm_site_recovery_protection_container.secondary[0].id
  target_network_id                         = azurerm_virtual_network.target.id
  test_network_id                           = azurerm_virtual_network.drill.id

  managed_disk {
    disk_id                    = azurerm_linux_virtual_machine.source.os_disk[0].id
    staging_storage_account_id = azurerm_storage_account.cache[0].id
    target_resource_group_id   = data.azurerm_resource_group.target.id
    target_disk_type           = "StandardSSD_LRS"
    target_replica_disk_type   = "StandardSSD_LRS"
  }

  network_interface {
    source_network_interface_id = azurerm_network_interface.source.id
    target_subnet_name          = azurerm_subnet.target.name
    failover_test_subnet_name   = azurerm_subnet.drill.name
  }

  depends_on = [
    azurerm_site_recovery_protection_container_mapping.mapping,
    azurerm_site_recovery_network_mapping.network,
  ]
}

# ---------------------------------------------------------------------------
# Outputs for azure-source.sh (resource names, no secrets)
# ---------------------------------------------------------------------------
output "source_vm_name" {
  value = azurerm_linux_virtual_machine.source.name
}

output "source_resource_group" {
  value = data.azurerm_resource_group.source.name
}

output "target_resource_group" {
  value = data.azurerm_resource_group.target.name
}

output "vault_name" {
  value = var.enable_replication ? azurerm_recovery_services_vault.asr[0].name : null
}

output "fabric_primary" {
  value = var.enable_replication ? azurerm_site_recovery_fabric.primary[0].name : null
}

output "container_primary" {
  value = var.enable_replication ? azurerm_site_recovery_protection_container.primary[0].name : null
}

output "protected_item" {
  value = var.enable_replication ? azurerm_site_recovery_replicated_vm.source[0].name : null
}

output "drill_network_id" {
  value = azurerm_virtual_network.drill.id
}
