#!/usr/bin/env bash
# Deploy Pol Grek site to GitHub Pages
# Prerequisites: gh auth login
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) не найден. Установите: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Сначала войдите: gh auth login"
  exit 1
fi

USER=$(gh api user --jq .login)
REPO_NAME="${1:-pol-grek-site}"
VISIBILITY="${2:-public}"

echo "GitHub user: $USER"
echo "Repo: $USER/$REPO_NAME ($VISIBILITY)"

# Ensure git identity
git config user.name >/dev/null 2>&1 || git config user.name "$USER"
git config user.email >/dev/null 2>&1 || git config user.email "${USER}@users.noreply.github.com"

# Create repo if missing
if ! gh repo view "$USER/$REPO_NAME" >/dev/null 2>&1; then
  echo "Создаю репозиторий..."
  gh repo create "$REPO_NAME" --"$VISIBILITY" --source=. --remote=origin --description "Сайт Пола Грэка — нейробиология без эзотерики"
else
  echo "Репозиторий уже есть — добавляю remote origin (если нет)"
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/$USER/$REPO_NAME.git"
fi

# Project site base path for nested assets/links
if [ "$REPO_NAME" != "${USER}.github.io" ]; then
  if ! grep -q "var manual = '/$REPO_NAME'" js/base-config.js 2>/dev/null; then
    # set manual base
    sed -i '' "s|var manual = '.*';|var manual = '/$REPO_NAME';|" js/base-config.js
    git add js/base-config.js
    git commit -m "Set GitHub Pages base path to /$REPO_NAME" || true
  fi
fi

git push -u origin main

echo "Включаю GitHub Pages (Actions)..."
# Enable pages via API (Actions source)
gh api -X POST "repos/$USER/$REPO_NAME/pages" \
  -f build_type=workflow \
  -f source='{"branch":"main","path":"/"}' 2>/dev/null \
  || gh api -X PUT "repos/$USER/$REPO_NAME/pages" \
       -f build_type=workflow 2>/dev/null \
  || true

# Trigger workflow
gh workflow run pages.yml -R "$USER/$REPO_NAME" 2>/dev/null || true

echo ""
echo "Готово. Через 1–2 минуты сайт будет здесь:"
if [ "$REPO_NAME" = "${USER}.github.io" ]; then
  echo "  https://${USER}.github.io/"
else
  echo "  https://${USER}.github.io/${REPO_NAME}/"
fi
echo ""
echo "Проверьте: Settings → Pages → Source = GitHub Actions"
echo "Статус: gh run list -R $USER/$REPO_NAME"
