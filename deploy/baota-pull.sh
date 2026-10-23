#!/usr/bin/env bash
# Sync Baota site root from GitHub deploy branch.
# Cron example (every 5 minutes):
#   */5 * * * * /bin/bash /www/wwwroot/ys.tongzhoukuajing.com/../scripts/baota-pull.sh >> /tmp/yuanshan-pull.log 2>&1
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/zuyuanwu-cell/yuanshan-channel.git}"
BRANCH="${BRANCH:-deploy}"
SITE_ROOT="${SITE_ROOT:-/www/wwwroot/ys.tongzhoukuajing.com}"
WORK_DIR="${WORK_DIR:-/www/wwwroot/yuanshan-channel-deploy}"

mkdir -p "$(dirname "$WORK_DIR")"

if [[ ! -d "$WORK_DIR/.git" ]]; then
  rm -rf "$WORK_DIR"
  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$WORK_DIR"
else
  cd "$WORK_DIR"
  git fetch --depth 1 origin "$BRANCH"
  LOCAL=$(git rev-parse HEAD)
  REMOTE=$(git rev-parse "FETCH_HEAD")
  if [[ "$LOCAL" == "$REMOTE" ]]; then
    exit 0
  fi
  git checkout -B "$BRANCH" "FETCH_HEAD"
  git reset --hard "FETCH_HEAD"
fi

mkdir -p "$SITE_ROOT"
# Preserve Baota/nginx special files; never wipe ACME challenges.
rsync -a --delete \
  --exclude='.user.ini' \
  --exclude='.htaccess' \
  --exclude='.well-known/' \
  --exclude='.git/' \
  "$WORK_DIR/" "$SITE_ROOT/"

echo "$(date '+%F %T') synced $(cd "$WORK_DIR" && git rev-parse --short HEAD) -> $SITE_ROOT"
