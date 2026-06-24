#!/usr/bin/env bash
# push_to_sd.sh — 推送 crx 文件到 SD 卡 Download 目录
# 用法:
#   ./push_to_sd.sh [crx源目录] [目标子目录]

set -euo pipefail

# ── 默认配置 ──────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEFAULT_SRC="$SCRIPT_DIR/../data/extensions"
DEST_BASE="/sdcard/Download"
DEST_SUB="extensions"
# ─────────────────────────────────────────────────────

SRC="${1:-$DEFAULT_SRC}"
DEST="$DEST_BASE/${2:-$DEST_SUB}"

ADB="${ADB:-adb}"

# 检查 adb
if ! command -v "$ADB" &>/dev/null; then
  echo "[ERROR] adb not found"
  exit 1
fi

# 检查设备
DEVICE_COUNT=$("$ADB" devices | grep -c "device$" || true)
if [[ "$DEVICE_COUNT" -eq 0 ]]; then
  echo "[ERROR] 未检测到 adb 设备"
  exit 1
fi

# 查找 crx
mapfile -t CRX_FILES < <(find "$SRC" -maxdepth 1 -name "*.crx" -type f | sort)

if [[ ${#CRX_FILES[@]} -eq 0 ]]; then
  echo "[WARN] $SRC 下未找到 .crx 文件"
  exit 0
fi

echo "[INFO] 源目录 : $SRC"
echo "[INFO] 目标路径: $DEST"
echo "[INFO] 共 ${#CRX_FILES[@]} 个 crx 文件"

"$ADB" shell mkdir -p "$DEST" 2>/dev/null || true

for f in "${CRX_FILES[@]}"; do
  echo "  + $ADB push \"$f\" \"$DEST/\""
  "$ADB" push "$f" "$DEST/"
done

echo "[OK] 推送完成 → $DEST"
