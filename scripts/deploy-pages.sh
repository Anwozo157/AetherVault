#!/usr/bin/env bash
# Publishes the production build to the gh-pages branch (GitHub Pages, free).
# Usage: npm run deploy   (run from a clean main branch)
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if [[ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]]; then
  echo "Deploy from main only." >&2; exit 1
fi
if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "Commit or stash changes before deploying." >&2; exit 1
fi

npm run verify

REV="$(git rev-parse --short HEAD)"
WORKTREE="$(mktemp -d)"
trap 'git worktree remove --force "$WORKTREE" 2>/dev/null || true' EXIT

git fetch -q origin gh-pages
git worktree add -q -B gh-pages "$WORKTREE" origin/gh-pages
(
  cd "$WORKTREE"
  git rm -rq --ignore-unmatch .
  cp -R "$OLDPWD/dist/." .
  touch .nojekyll
  git add -A
  git commit -q -m "deploy: $REV"
  git push -q origin gh-pages
)
echo "Deployed $REV to https://anwozo157.github.io/AetherVault/ (allow ~1 minute to go live)."
