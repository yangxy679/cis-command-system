#!/bin/bash

# CIS系统自动汇报脚本
# 每30分钟自动汇报开发状态

REPORT_FILE="AUTO-REPORT-$(date '+%Y%m%d-%H%M').md"
PROGRESS_FILE="REAL-TIME-PROGRESS-TRACKER.md"

echo "# 🎖️ CIS系统开发自动汇报 - $(date '+%Y年%m月%d日 %H:%M')" > $REPORT_FILE
echo "" >> $REPORT_FILE

echo "## 📊 开发状态概览" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# 获取代码统计
BACKEND_FILES=$(find backend/src -name "*.ts" 2>/dev/null | wc -l)
BACKEND_LINES=$(find backend/src -name "*.ts" -exec cat {} \; 2>/dev/null | wc -l)
FRONTEND_FILES=$(find frontend/src -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l)
FRONTEND_LINES=$(find frontend/src -name "*.ts" -o -name "*.tsx" -exec cat {} \; 2>/dev/null | wc -l)

echo "- **后端开发：** $BACKEND_FILES 个文件，$BACKEND_LINES 行代码" >> $REPORT_FILE
echo "- **前端开发：** $FRONTEND_FILES 个文件，$FRONTEND_LINES 行代码" >> $REPORT_FILE
echo "" >> $REPORT_FILE

echo "## 🚀 最近完成的工作" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# 获取最近修改的文件
echo "### 最近修改的文件：" >> $REPORT_FILE
find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" 2>/dev/null | \
  xargs ls -lt 2>/dev/null | head -5 | awk '{print "- " $6 " " $7 " " $8 " " $9}' >> $REPORT_FILE
echo "" >> $REPORT_FILE

echo "## 📈 进度分析" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# 读取进度跟踪器中的进度
if [ -f "$PROGRESS_FILE" ]; then
  PROGRESS=$(grep "进度百分比：" $PROGRESS_FILE | head -1 | sed 's/.*进度百分比： //' | sed 's/%//')
  STATUS=$(grep "当前状态：" $PROGRESS_FILE | head -1 | sed 's/.*当前状态： //')
  
  echo "- **当前进度：** $PROGRESS%" >> $REPORT_FILE
  echo "- **开发状态：** $STATUS" >> $REPORT_FILE
fi

echo "" >> $REPORT_FILE
echo "## 🎯 下一步计划" >> $REPORT_FILE
echo "" >> $REPORT_FILE
echo "1. **继续完善AuthService业务逻辑**" >> $REPORT_FILE
echo "2. **创建前端登录页面**" >> $REPORT_FILE
echo "3. **编写单元测试**" >> $REPORT_FILE
echo "4. **进行集成测试**" >> $REPORT_FILE

echo "" >> $REPORT_FILE
echo "---" >> $REPORT_FILE
echo "**汇报时间：** $(date '+%Y年%m月%d日 %H:%M')" >> $REPORT_FILE
echo "**汇报机制：** 自动汇报脚本" >> $REPORT_FILE

echo "✅ 自动汇报文件已创建: $REPORT_FILE"
echo "📝 汇报内容已准备就绪"
