#!/usr/bin/env bash
set -euo pipefail
export PATH="$HOME/bin:/usr/local/bin:$PATH"
cd "$(dirname "$0")"

if ! gh auth status >/dev/null 2>&1; then
  echo ">>> Войдите в GitHub (браузер откроется):"
  gh auth login -h github.com -p https -w
fi

gh auth status
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/komandaedinomyshlennikov-ops/polgrek.git
git push -u origin main --force

# Enable Pages with Actions
gh api -X POST repos/komandaedinomyshlennikov-ops/polgrek/pages \
  -f build_type=workflow 2>/dev/null || \
gh api -X PUT repos/komandaedinomyshlennikov-ops/polgrek/pages \
  -f build_type=workflow 2>/dev/null || true

# Also try classic pages from branch as fallback
gh api -X PUT repos/komandaedinomyshlennikov-ops/polgrek/pages \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/ 2>/dev/null || true

echo ""
echo "=========================================="
echo "Сайт (через 1–2 мин):"
echo "https://komandaedinomyshlennikov-ops.github.io/polgrek/"
echo "Репозиторий:"
echo "https://github.com/komandaedinomyshlennikov-ops/polgrek"
echo "=========================================="
