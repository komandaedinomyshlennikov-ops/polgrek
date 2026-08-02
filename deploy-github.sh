#!/usr/bin/env bash
# Deploy polgrek.site via GitHub Actions (Next.js static export from web/)
# Prerequisites: gh auth login · push access · Pages: GitHub Actions
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login"
  exit 1
fi

REPO="${GITHUB_REPOSITORY:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}"
echo "Repo: $REPO"

echo "→ Ensure Pages build_type=workflow (GitHub Actions)…"
gh api -X PUT "repos/${REPO}/pages" \
  -f build_type=workflow \
  -f cname=polgrek.site \
  2>/dev/null \
  || gh api -X POST "repos/${REPO}/pages" \
       -f build_type=workflow \
       -f cname=polgrek.site \
       2>/dev/null \
  || echo "(Pages API: may already be configured — check Settings → Pages)"

echo "→ Push main (triggers Deploy Pages workflow)…"
git push origin main

echo "→ Trigger workflow_dispatch if needed…"
gh workflow run deploy-pages.yml -R "$REPO" 2>/dev/null || true

echo ""
echo "Status:  gh run list -R $REPO --workflow=deploy-pages.yml"
echo "Site:    https://polgrek.site/"
echo "Custom domain + HTTPS: Settings → Pages (cname polgrek.site)"
