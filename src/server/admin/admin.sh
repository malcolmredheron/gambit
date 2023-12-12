#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
docker-compose -f docker-compose-admin.yml build --quiet
docker-compose -f docker-compose-admin.yml run --rm admin npx ts-node "$@"
