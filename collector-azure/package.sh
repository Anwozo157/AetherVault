#!/bin/sh
# Zips the built function app for Flex Consumption (one-deploy): main points at function.mjs.
set -eu
D=dist-collector-azure/function
cat >"$D/package.json" <<'J'
{ "name": "aethervault-azure-collector", "type": "module", "main": "function.mjs" }
J
cat >"$D/host.json" <<'J'
{ "version": "2.0", "extensionBundle": { "id": "Microsoft.Azure.Functions.ExtensionBundle", "version": "[4.*, 5.0.0)" } }
J
(cd "$D" && zip -q -FS function.zip function.mjs package.json host.json THIRD_PARTY_NOTICES.txt)
echo "$D/function.zip"
