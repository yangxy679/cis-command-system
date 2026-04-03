#!/bin/bash

# CIS系统开发状态监控脚本
# 每分钟自动检查开发状态并更新进度跟踪器

echo "🎯 CIS系统开发状态监控 - $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="

# 检查后端代码状态
echo "📊 后端开发状态:"
BACKEND_FILES=$(find backend/src -name "*.ts" 2>/dev/null | wc -l)
BACKEND_LINES=$(find backend/src -name "*.ts" -exec cat {} \; 2>/dev/null | wc -l)
echo "  - 文件数量: $BACKEND_FILES"
echo "  - 代码行数: $BACKEND_LINES"

# 检查前端代码状态
echo "📊 前端开发状态:"
FRONTEND_FILES=$(find frontend/src -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l)
FRONTEND_LINES=$(find frontend/src -name "*.ts" -o -name "*.tsx" -exec cat {} \; 2>/dev/null | wc -l)
echo "  - 文件数量: $FRONTEND_FILES"
echo "  - 代码行数: $FRONTEND_LINES"

# 检查测试代码状态
echo "📊 测试开发状态:"
TEST_FILES=$(find . -name "*.spec.ts" -o -name "*.test.ts" 2>/dev/null | wc -l)
TEST_LINES=$(find . -name "*.spec.ts" -o -name "*.test.ts" -exec cat {} \; 2>/dev/null | wc -l)
echo "  - 测试文件: $TEST_FILES"
echo "  - 测试代码: $TEST_LINES"

# 计算总体进度
TOTAL_FILES=$((BACKEND_FILES + FRONTEND_FILES + TEST_FILES))
TOTAL_LINES=$((BACKEND_LINES + FRONTEND_LINES + TEST_LINES))

echo "📈 总体进度:"
echo "  - 总文件数: $TOTAL_FILES"
echo "  - 总代码行: $TOTAL_LINES"

# 检查最近修改的文件
echo "🔄 最近修改的文件:"
find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" 2>/dev/null | \
  xargs ls -lt 2>/dev/null | head -5 | awk '{print "  - " $6 " " $7 " " $8 " " $9}'

# 检查Git状态
echo "🔗 Git状态:"
if [ -d ".git" ]; then
  git status --short 2>/dev/null | head -10 | awk '{print "  - " $0}'
else
  echo "  - 未初始化Git仓库"
fi

echo ""
echo "⏰ 监控时间: $(date '+%H:%M:%S')"
echo "✅ 监控完成"

# 更新进度跟踪器
if [ -f "REAL-TIME-PROGRESS-TRACKER.md" ]; then
  # 更新最后更新时间
  sed -i '' "s/最后更新：.*/最后更新： $(date '+%Y年%m月%d日 %H:%M')/" REAL-TIME-PROGRESS-TRACKER.md
  
  # 计算进度百分比（基于时间）
  START_HOUR=20
  START_MINUTE=48
  CURRENT_HOUR=$(date '+%H')
  CURRENT_MINUTE=$(date '+%M')
  
  ELAPSED_MINUTES=$(( (CURRENT_HOUR - START_HOUR) * 60 + (CURRENT_MINUTE - START_MINUTE) ))
  TOTAL_MINUTES=60  # 第一阶段60分钟
  
  if [ $ELAPSED_MINUTES -lt 0 ]; then
    ELAPSED_MINUTES=0
  fi
  
  if [ $ELAPSED_MINUTES -gt $TOTAL_MINUTES ]; then
    ELAPSED_MINUTES=$TOTAL_MINUTES
  fi
  
  PROGRESS_PERCENT=$(( ELAPSED_MINUTES * 100 / TOTAL_MINUTES ))
  
  # 更新进度百分比
  sed -i '' "s/进度百分比：.*%/进度百分比： $PROGRESS_PERCENT%/" REAL-TIME-PROGRESS-TRACKER.md
  
  echo "📝 进度跟踪器已更新"
  echo "📊 当前进度: $PROGRESS_PERCENT%"
fi
