# Database-level DR tier (experiment): a PostgreSQL streaming-replication standby in the recovery
# region, next to Site Recovery's server-level copy. Site Recovery loses minutes of data on a drill
# (5-minute recovery points, ~1-2 min RPO; docs/AZURE_LIVE_POC.md); a streaming standby should lose
# seconds. Off by default; `scripts/poc/azure-source.sh db-standby` turns it on (founder approval).
#
#   source VM (North Central US, 10.10.1.0/24)  --global VNet peering, port 5432-->  standby VM
#   primary: replication role + pg_hba for 10.20.2.0/24 only       (West US 2, 10.20.2.0/24)
#
# The replication password is random, lives only in Terraform state (private, Entra-only storage)
# and reaches the VMs as Run Command protected parameters (environment variables), never in
# custom_data or the repo.

variable "enable_db_standby" {
  description = "Create the PostgreSQL streaming standby in the recovery region (experiment)."
  type        = bool
  default     = false
}

locals {
  standby_subnet = "10.20.2.0/24"
}

resource "random_password" "replication" {
  count   = var.enable_db_standby ? 1 : 0
  length  = 32
  special = false # used inside a libpq connection string and .pgpass
}

# --- Network: standby subnet in the recovery VNet, peered with the source VNet ----------------
resource "azurerm_subnet" "db" {
  count                = var.enable_db_standby ? 1 : 0
  name                 = "snet-db"
  resource_group_name  = data.azurerm_resource_group.target.name
  virtual_network_name = azurerm_virtual_network.target.name
  address_prefixes     = [local.standby_subnet]
}

# No custom rules: Azure's defaults deny inbound from the internet and allow VNet (incl. peered)
# traffic, which is all replication needs (the standby connects out to the primary).
resource "azurerm_network_security_group" "db" {
  count               = var.enable_db_standby ? 1 : 0
  name                = "nsg-aethervault-db-standby"
  location            = data.azurerm_resource_group.target.location
  resource_group_name = data.azurerm_resource_group.target.name
  tags                = local.tags
}

resource "azurerm_subnet_network_security_group_association" "db" {
  count                     = var.enable_db_standby ? 1 : 0
  subnet_id                 = azurerm_subnet.db[0].id
  network_security_group_id = azurerm_network_security_group.db[0].id
}

resource "azurerm_virtual_network_peering" "source_to_target" {
  count                     = var.enable_db_standby ? 1 : 0
  name                      = "peer-source-to-recovery"
  resource_group_name       = data.azurerm_resource_group.source.name
  virtual_network_name      = azurerm_virtual_network.source.name
  remote_virtual_network_id = azurerm_virtual_network.target.id
}

resource "azurerm_virtual_network_peering" "target_to_source" {
  count                     = var.enable_db_standby ? 1 : 0
  name                      = "peer-recovery-to-source"
  resource_group_name       = data.azurerm_resource_group.target.name
  virtual_network_name      = azurerm_virtual_network.target.name
  remote_virtual_network_id = azurerm_virtual_network.source.id
}

# Outbound internet for package installs only (inbound still blocked by the NSG defaults).
resource "azurerm_public_ip" "db" {
  count               = var.enable_db_standby ? 1 : 0
  name                = "pip-aethervault-db-standby"
  location            = data.azurerm_resource_group.target.location
  resource_group_name = data.azurerm_resource_group.target.name
  allocation_method   = "Static"
  sku                 = "Standard"
  tags                = local.tags
}

resource "azurerm_network_interface" "db" {
  count               = var.enable_db_standby ? 1 : 0
  name                = "nic-aethervault-db-standby"
  location            = data.azurerm_resource_group.target.location
  resource_group_name = data.azurerm_resource_group.target.name
  tags                = local.tags

  ip_configuration {
    name                          = "primary"
    subnet_id                     = azurerm_subnet.db[0].id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.db[0].id
  }
}

resource "azurerm_linux_virtual_machine" "db" {
  count                           = var.enable_db_standby ? 1 : 0
  name                            = "vm-aethervault-db-standby"
  location                        = data.azurerm_resource_group.target.location
  resource_group_name             = data.azurerm_resource_group.target.name
  size                            = var.vm_size
  admin_username                  = var.admin_username
  disable_password_authentication = true
  network_interface_ids           = [azurerm_network_interface.db[0].id]
  # PostgreSQL only; the standby is seeded by the Run Command below.
  custom_data = base64encode(<<-EOT
    #cloud-config
    package_update: true
    packages:
      - postgresql
  EOT
  )
  tags = local.tags

  admin_ssh_key {
    username   = var.admin_username
    public_key = var.ssh_public_key
  }

  os_disk {
    name                 = "osdisk-aethervault-db-standby"
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

  boot_diagnostics {}
}

resource "azurerm_dev_test_global_vm_shutdown_schedule" "db" {
  count                 = var.enable_db_standby && var.auto_shutdown_time != "" ? 1 : 0
  virtual_machine_id    = azurerm_linux_virtual_machine.db[0].id
  location              = data.azurerm_resource_group.target.location
  enabled               = true
  daily_recurrence_time = var.auto_shutdown_time
  timezone              = "Eastern Standard Time"
  tags                  = local.tags

  notification_settings {
    enabled = false
  }
}

# --- Primary: replication role, listen on the private network, allow only the standby subnet ---
resource "azurerm_virtual_machine_run_command" "primary_replication" {
  count              = var.enable_db_standby ? 1 : 0
  name               = "aethervault-primary-replication"
  location           = data.azurerm_resource_group.source.location
  virtual_machine_id = azurerm_linux_virtual_machine.source.id
  tags               = local.tags

  source {
    script = <<-EOT
      set -eu
      V=$(ls /etc/postgresql | sort -V | tail -1); C=/etc/postgresql/$V/main
      until sudo -u postgres psql -qtAc 'select 1' >/dev/null 2>&1; do sleep 2; done
      sudo -u postgres psql -qv ON_ERROR_STOP=1 <<'SQL'
      DO $$BEGIN
        IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'replicator') THEN
          CREATE ROLE replicator WITH REPLICATION LOGIN;
        END IF;
      END$$;
      SQL
      # printf is a shell builtin: the password never appears in a process list.
      printf "ALTER ROLE replicator PASSWORD '%s';\n" "$REPL_PASSWORD" | sudo -u postgres psql -qv ON_ERROR_STOP=1
      echo "listen_addresses = '*'" > "$C/conf.d/aethervault-replication.conf"
      grep -q 'aethervault-standby' "$C/pg_hba.conf" || \
        echo "host replication replicator ${local.standby_subnet} scram-sha-256 # aethervault-standby" >> "$C/pg_hba.conf"
      systemctl restart postgresql
      echo "primary ready"
    EOT
  }

  protected_parameter {
    name  = "REPL_PASSWORD"
    value = random_password.replication[0].result
  }
}

# --- Standby: base backup from the primary, then stream (replication slot keeps needed WAL) ----
resource "azurerm_virtual_machine_run_command" "standby_seed" {
  count              = var.enable_db_standby ? 1 : 0
  name               = "aethervault-standby-seed"
  location           = data.azurerm_resource_group.target.location
  virtual_machine_id = azurerm_linux_virtual_machine.db[0].id
  tags               = local.tags

  source {
    script = <<-EOT
      set -eu
      cloud-init status --wait >/dev/null || true
      V=$(ls /etc/postgresql | sort -V | tail -1); D=/var/lib/postgresql/$V/main
      for i in $(seq 1 60); do pg_isready -q -h "$PRIMARY_IP" -p 5432 && break; sleep 5; done
      PASS=/var/lib/postgresql/.pgpass
      printf '%s:5432:*:replicator:%s\n' "$PRIMARY_IP" "$REPL_PASSWORD" > "$PASS"
      chown postgres:postgres "$PASS"; chmod 600 "$PASS"
      systemctl stop postgresql
      rm -rf "$D"; install -d -o postgres -g postgres -m 700 "$D"
      # First seed creates the replication slot; a re-seed after a promote drill reuses it.
      B="pg_basebackup -h $PRIMARY_IP -U replicator -D $D -R -X stream -S standby_westus2"
      sudo -u postgres $B -C 2>/tmp/seed.err || {
        grep -q 'already exists' /tmp/seed.err || { cat /tmp/seed.err >&2; exit 1; }
        rm -rf "$D"; install -d -o postgres -g postgres -m 700 "$D"
        sudo -u postgres $B
      }
      systemctl start postgresql
      sudo -u postgres psql -qtAc 'select pg_is_in_recovery()'
    EOT
  }

  parameter {
    name  = "PRIMARY_IP"
    value = azurerm_network_interface.source.private_ip_address
  }

  protected_parameter {
    name  = "REPL_PASSWORD"
    value = random_password.replication[0].result
  }

  timeouts {
    create = "60m"
  }

  depends_on = [
    azurerm_virtual_machine_run_command.primary_replication,
    azurerm_virtual_network_peering.source_to_target,
    azurerm_virtual_network_peering.target_to_source,
  ]
}

output "db_standby_vm_name" {
  value = var.enable_db_standby ? azurerm_linux_virtual_machine.db[0].name : ""
}
