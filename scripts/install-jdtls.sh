#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
version='1.50.0-202509041425'
archive="$root/.local/jdtls-compatible.tar.gz"
destination="$root/.local/jdtls-compatible"
expected='3292c5c33888f95ab0ff718e777ee94ff5496b8635a23a8844b876ee090ebdea'

if compgen -G "$destination/plugins/org.eclipse.equinox.launcher_*.jar" >/dev/null; then
  printf 'JDT LS already installed in %s\n' "$destination"
  exit 0
fi

mkdir -p "$destination"
curl -fL --max-time 300 -o "$archive" "https://download.eclipse.org/jdtls/milestones/1.50.0/jdt-language-server-${version}.tar.gz"
printf '%s  %s\n' "$expected" "$archive" | shasum -a 256 -c -
tar -xzf "$archive" -C "$destination"
printf 'Installed JDT LS %s in %s\n' "$version" "$destination"
