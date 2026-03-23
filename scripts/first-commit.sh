#!/bin/bash

# CIS系统第一次Git提交脚本
# 执行前请确保已获得总指挥批准

echo "🎖️ CIS系统第一次Git提交准备..."
echo "========================================"

# 检查当前目录
if [ ! -f "README.md" ]; then
    echo "❌ 错误：请在cis-command-system根目录执行此脚本"
    exit 1
fi

echo "📁 检查项目结构..."
echo "当前目录：$(pwd)"
echo ""

# 显示项目结构
echo "📋 项目结构："
find . -maxdepth 3 -type f -name "*.json" -o -name "*.md" -o -name "*.yml" -o -name "*.txt" | sort
echo ""

# 检查Git状态
echo "🔍 检查Git状态..."
if [ ! -d ".git" ]; then
    echo "初始化Git仓库..."
    git init
else
    echo "Git仓库已存在"
fi

# 添加所有文件
echo "📦 添加文件到暂存区..."
git add .

# 显示添加的文件
echo "📝 将要提交的文件："
git status --short
echo ""

# 确认提交
read -p "⚠️  确认提交到GitHub？(y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 提交取消"
    exit 0
fi

# 提交
echo "💾 提交代码..."
git commit -m "feat: CIS系统基础架构搭建完成

- 项目基础结构创建
- 前端：React + TypeScript + Ant Design配置
- 后端：NestJS + TypeScript + PostgreSQL配置
- 数据中台：Python + FastAPI + Airflow配置
- 基础设施：Docker完整容器化配置
- 监控体系：Prometheus + Grafana配置

启动时间：2026年3月22日 12:23
总指挥指令：'立即开始'
项目状态：开发进行中"

echo ""
echo "✅ 本地提交完成"

# 检查远程仓库
echo "🌐 检查远程仓库..."
if git remote | grep -q "origin"; then
    echo "远程仓库已配置"
else
    echo "配置远程仓库..."
    git remote add origin https://github.com/yangxy679/CIS-Command-System.git
fi

# 推送到GitHub
echo "🚀 推送到GitHub..."
read -p "⚠️  确认推送到GitHub？(y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 推送取消，代码已保存在本地"
    exit 0
fi

git branch -M main
git push -u origin main

echo ""
echo "🎉 第一次提交完成！"
echo "========================================"
echo "📊 提交信息："
git log --oneline -1
echo ""
echo "🔗 GitHub仓库：https://github.com/yangxy679/CIS-Command-System"
echo "📁 文件数量：$(find . -type f | wc -l) 个文件"
echo "📦 提交大小：$(git count-objects -vH | grep size-pack | cut -d' ' -f2)"
echo ""
echo "🎖️ CIS系统开发正式启动！"