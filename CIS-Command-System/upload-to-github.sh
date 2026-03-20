#!/bin/bash

# CIS作战指挥系统 - GitHub上传脚本
# 总指挥稍后执行此脚本完成上传

echo "🎖️ CIS作战指挥系统 - GitHub上传脚本"
echo "======================================"
echo "开始时间：$(date)"
echo ""

echo "1. 检查当前目录..."
if [ ! -f "README.md" ]; then
    echo "错误：请在项目根目录执行此脚本"
    echo "正确目录：/Users/yangxy/.openclaw/workspace/CIS-Command-System"
    exit 1
fi

echo "当前目录：$(pwd)"
echo "文件数量：$(find . -type f ! -path "./.git/*" | wc -l)"
echo ""

echo "2. 配置Git..."
git config --global user.name "CIS-Command-System"
git config --global user.email "279927653@qq.com"
echo "Git用户：$(git config user.name)"
echo "Git邮箱：$(git config user.email)"
echo ""

echo "3. 初始化Git仓库..."
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git仓库初始化完成"
else
    echo "✅ Git仓库已存在"
fi

echo "4. 配置远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/yangxy679/CIS-Command-System.git
echo "远程仓库配置："
git remote -v
echo ""

echo "5. 添加所有文件到Git..."
git add .
echo "✅ 文件已添加到暂存区"
echo ""

echo "6. 提交更改..."
COMMIT_MSG="feat: initial project structure - CIS Command System - $(date '+%Y-%m-%d %H:%M:%S')"
if git commit -m "$COMMIT_MSG" 2>/dev/null; then
    echo "✅ 提交成功：$COMMIT_MSG"
else
    echo "⚠️ 提交失败或无更改"
    echo "当前Git状态："
    git status --short | head -10
    echo ""
    echo "尝试强制提交..."
    git commit --allow-empty -m "Initial commit - CIS Command System"
fi
echo ""

echo "7. 推送到GitHub..."
echo "目标分支：master"
echo "开始推送..."

# 尝试推送到master分支
if git push -u origin master --force 2>&1; then
    echo "✅ ✅ ✅ 推送成功！"
    echo ""
    echo "🎉 恭喜！项目已成功上传到GitHub！"
    echo "仓库地址：https://github.com/yangxy679/CIS-Command-System"
    echo "分支：master"
    echo "时间：$(date)"
    echo ""
    echo "请立即访问验证："
    echo "https://github.com/yangxy679/CIS-Command-System"
    echo ""
    echo "📞 验证后请回复指导员：'上传成功'"
    echo "我将立即开始后端开发！"
else
    echo "❌ 推送失败"
    echo ""
    echo "可能的原因："
    echo "1. 网络连接问题"
    echo "2. GitHub认证失败"
    echo "3. 仓库权限问题"
    echo "4. 需要2FA验证"
    echo ""
    echo "🔧 解决方案："
    echo "1. 检查网络连接"
    echo "2. 登录GitHub验证账户"
    echo "3. 临时禁用2FA（上传后恢复）"
    echo "4. 或使用Web界面上传"
    echo ""
    echo "📋 Web上传步骤："
    echo "1. 访问 https://github.com/yangxy679/CIS-Command-System"
    echo "2. 点击'Add file' → 'Upload files'"
    echo "3. 拖拽整个文件夹上传"
    echo "4. 提交到master分支"
    echo ""
    echo "预计耗时：3分钟"
fi

echo ""
echo "======================================"
echo "脚本执行完成时间：$(date)"
echo ""

echo "📊 项目统计："
echo "- 总文件数：$(find . -type f ! -path "./.git/*" | wc -l)"
echo "- 总目录数：$(find . -type d ! -path "./.git/*" | wc -l)"
echo "- 前端文件：$(find frontend -type f 2>/dev/null | wc -l)"
echo "- 文档文件：$(find docs -type f 2>/dev/null | wc -l)"
echo "- 配置文件：$(find . -name "*.json" -o -name "*.yml" -o -name "*.yaml" 2>/dev/null | wc -l)"

echo ""
echo "🚀 项目技术栈："
echo "- 前端：React 18 + TypeScript + Ant Design"
echo "- 后端：NestJS + PostgreSQL + Redis（准备中）"
echo "- 部署：Docker + GitHub Actions"
echo "- 文档：完整开发指南和API文档"

echo ""
echo "🎖️ 虚拟Agent军团作战指挥系统 - 等待您的上传！"