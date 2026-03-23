#!/bin/bash

echo "🔍 检查GitHub提交状态"
echo "========================================"
echo "检查时间: $(date)"
echo "项目目录: $(pwd)"
echo ""

# 检查Git是否已初始化
echo "1. 检查Git初始化状态..."
if [ -d ".git" ]; then
    echo "   ✅ Git仓库已初始化"
    echo "   当前分支: $(git branch --show-current 2>/dev/null || echo '未设置')"
else
    echo "   ⚠️ Git仓库未初始化"
fi
echo ""

# 检查文件状态
echo "2. 检查文件状态..."
if [ -d ".git" ]; then
    git status --short
else
    echo "   未跟踪的文件:"
    find . -type f -not -path "./.git/*" -not -name "check-git-status.sh" | head -20
fi
echo ""

# 检查远程仓库配置
echo "3. 检查远程仓库配置..."
if [ -d ".git" ]; then
    git remote -v
else
    echo "   未配置远程仓库"
fi
echo ""

# 检查Git配置
echo "4. 检查Git配置..."
echo "   用户名: $(git config --global user.name 2>/dev/null || echo '未设置')"
echo "   邮箱: $(git config --global user.email 2>/dev/null || echo '未设置')"
echo ""

# 检查GitHub连接
echo "5. 检查GitHub连接..."
if command -v ssh &> /dev/null; then
    echo "   测试SSH连接..."
    ssh -T git@github.com 2>&1 | head -5
else
    echo "   SSH客户端未安装"
fi
echo ""

# 检查文件数量
echo "6. 项目文件统计..."
echo "   总文件数: $(find . -type f -not -path "./.git/*" | wc -l)"
echo "   目录数: $(find . -type d -not -path "./.git/*" | wc -l)"
echo "   代码文件: $(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.py" \) -not -path "./.git/*" | wc -l)"
echo "   配置文件: $(find . -type f \( -name "*.json" -o -name "*.yml" -o -name "*.yaml" -o -name "*.toml" \) -not -path "./.git/*" | wc -l)"
echo "   文档文件: $(find . -type f -name "*.md" -not -path "./.git/*" | wc -l)"
echo ""

echo "========================================"
echo "📋 建议操作:"
echo ""
if [ ! -d ".git" ]; then
    echo "1. 初始化Git仓库:"
    echo "   git init"
    echo ""
fi

if [ -d ".git" ] && [ -z "$(git remote -v)" ]; then
    echo "2. 添加远程仓库:"
    echo "   git remote add origin https://github.com/yangxy679/CIS-Command-System.git"
    echo ""
fi

if [ -d ".git" ] && [ -n "$(git status --porcelain)" ]; then
    echo "3. 提交代码:"
    echo "   git add ."
    echo "   git commit -m 'feat: CIS系统基础架构搭建完成'"
    echo ""
fi

if [ -d ".git" ] && git remote | grep -q "origin"; then
    echo "4. 推送到GitHub:"
    echo "   git push -u origin main"
    echo ""
fi

echo "5. 验证GitHub显示:"
echo "   访问 https://github.com/yangxy679/CIS-Command-System"
echo ""

echo "🎖️ 请执行上述建议操作来解决GitHub提交问题"