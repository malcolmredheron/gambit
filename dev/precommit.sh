#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

npm install
npx tsc --noEmit --project tsconfig.json # check types
npx prettier --write --config .prettierrc "**"
npx eslint "src/**"
npm run testOnce
docker-compose build
echo
echo "Ready to vote"
