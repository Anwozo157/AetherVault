#!/usr/bin/env bash
# Runs the signed-in console E2E tests against local Supabase (Docker).
# Resets the local database first so every run starts from the seed.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

npx supabase status >/dev/null 2>&1 || npx supabase start
npx supabase db reset >/dev/null

eval "$(npx supabase status -o env | grep -E '^(API_URL|ANON_KEY)=')"
export VITE_SUPABASE_URL="$API_URL" VITE_SUPABASE_ANON_KEY="$ANON_KEY"
npx playwright test -c playwright.console.config.ts "$@"
