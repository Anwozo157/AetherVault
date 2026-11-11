#!/usr/bin/env bash
# Publishes the production build to the gh-pages branch (GitHub Pages, free).
# Usage: npm run deploy            (run from a clean main branch)
#        DRY_RUN=1 npm run deploy  (does everything except push)
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

if [[ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]]; then
  echo "Deploy from main only." >&2; exit 1
fi
if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "Commit or stash changes before deploying." >&2; exit 1
fi

npm run verify

# Never publish a build wired to a local database (e.g. from a stray .env.local).
if grep -rqE "127\.0\.0\.1:543|localhost:543" dist/; then
  echo "dist/ references a local Supabase URL. Remove .env.local (use .env.development.local) and retry." >&2
  exit 1
fi

REV="$(git rev-parse --short HEAD)"
WORKTREE="$(mktemp -d)"
cleanup() {
  git -C "$ROOT" worktree remove --force "$WORKTREE" 2>/dev/null || true
  git -C "$ROOT" branch -D gh-pages >/dev/null 2>&1 || true
}
trap cleanup EXIT

git fetch -q origin gh-pages
git worktree add -q -B gh-pages "$WORKTREE" origin/gh-pages
git -C "$WORKTREE" rm -rq --ignore-unmatch .
# Exclude .git: an older manual deploy left a git repo inside dist/, which Vite preserves.
rsync -a --exclude=".git" "$ROOT/dist/" "$WORKTREE/"
touch "$WORKTREE/.nojekyll"
git -C "$WORKTREE" add -A
git -C "$WORKTREE" commit -q -m "deploy: $REV"

if [[ "${DRY_RUN:-}" == "1" ]]; then
  echo "DRY RUN: would publish these files:"
  git -C "$WORKTREE" ls-files
  exit 0
fi

git -C "$WORKTREE" push -q origin gh-pages
echo "Deployed $REV to https://getaethervault.com/ (allow ~1 minute to go live)."
