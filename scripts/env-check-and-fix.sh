#!/bin/bash

# CIS系统环境检查和修复脚本
# 功能：检查Git、GitHub、Docker环境，自动修复常见问题

set -e

echo "🔧 CIS系统环境检查和修复脚本"
echo "========================================"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 日志函数
log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查并安装命令
check_and_install() {
    local cmd=$1
    local install_cmd=$2
    
    if ! command -v $cmd &> /dev/null; then
        warning "$cmd 未安装"
        if [ -n "$install_cmd" ]; then
            log "尝试安装 $cmd..."
            eval $install_cmd
            if command -v $cmd &> /dev/null; then
                success "$cmd 安装成功"
            else
                error "$cmd 安装失败，请手动安装"
                return 1
            fi
        else
            error "请手动安装 $cmd"
            return 1
        fi
    else
        success "$cmd 已安装: $(which $cmd)"
    fi
    return 0
}

# 主检查函数
check_git() {
    log "检查Git环境..."
    check_and_install "git" "brew install git || apt-get install git -y || yum install git -y"
    
    if command -v git &> /dev/null; then
        # 检查Git配置
        local git_name=$(git config --global user.name)
        local git_email=$(git config --global user.email)
        
        if [ -z "$git_name" ]; then
            warning "Git用户名未配置"
            git config --global user.name "CIS System Developer"
            success "已设置Git用户名"
        else
            success "Git用户名: $git_name"
        fi
        
        if [ -z "$git_email" ]; then
            warning "Git邮箱未配置"
            git config --global user.email "developer@cis-system.com"
            success "已设置Git邮箱"
        else
            success "Git邮箱: $git_email"
        fi
    fi
}

check_github() {
    log "检查GitHub连接..."
    
    # 检查SSH密钥
    if [ -f ~/.ssh/id_rsa.pub ] || [ -f ~/.ssh/id_ed25519.pub ]; then
        success "SSH密钥存在"
        
        # 测试SSH连接
        log "测试SSH连接到GitHub..."
        if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
            success "GitHub SSH连接正常"
        else
            warning "GitHub SSH连接失败，尝试HTTPS方式"
        fi
    else
        warning "SSH密钥未找到，将使用HTTPS方式"
    fi
    
    # 检查是否可以访问GitHub
    log "检查GitHub网络连接..."
    if curl -s --head https://github.com | grep -q "200 OK"; then
        success "可以访问GitHub"
    else
        error "无法访问GitHub，请检查网络连接"
        return 1
    fi
}

check_docker() {
    log "检查Docker环境..."
    check_and_install "docker" "brew install docker || curl -fsSL https://get.docker.com | sh"
    check_and_install "docker-compose" "brew install docker-compose || pip install docker-compose"
    
    if command -v docker &> /dev/null; then
        # 检查Docker服务状态
        if docker info &> /dev/null; then
            success "Docker服务运行正常"
            
            # 检查Docker版本
            local docker_version=$(docker --version)
            local compose_version=$(docker-compose --version 2>/dev/null || echo "未安装")
            success "Docker版本: $docker_version"
            success "Docker Compose: $compose_version"
        else
            error "Docker服务未运行，请启动Docker服务"
            return 1
        fi
    fi
}

check_node() {
    log "检查Node.js环境..."
    check_and_install "node" "brew install node || curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs"
    check_and_install "npm" ""
    
    if command -v node &> /dev/null; then
        local node_version=$(node --version)
        local npm_version=$(npm --version)
        success "Node.js版本: $node_version"
        success "npm版本: $npm_version"
    fi
}

check_python() {
    log "检查Python环境..."
    check_and_install "python3" "brew install python || apt-get install python3 -y"
    
    if command -v python3 &> /dev/null; then
        local python_version=$(python3 --version)
        success "Python版本: $python_version"
        
        # 检查pip
        if command -v pip3 &> /dev/null; then
            success "pip已安装"
        else
            warning "pip未安装，尝试安装..."
            curl -sS https://bootstrap.pypa.io/get-pip.py | python3
            success "pip安装完成"
        fi
    fi
}

check_project_structure() {
    log "检查项目结构..."
    
    local required_dirs=("frontend" "backend" "data-platform" "scripts" ".github/workflows")
    local required_files=("README.md" "docker-compose.yml" "package.json" "frontend/package.json" "backend/package.json")
    
    # 检查目录
    for dir in "${required_dirs[@]}"; do
        if [ -d "$dir" ]; then
            success "目录存在: $dir"
        else
            error "目录不存在: $dir"
            return 1
        fi
    done
    
    # 检查文件
    for file in "${required_files[@]}"; do
        if [ -f "$file" ]; then
            success "文件存在: $file"
        else
            warning "文件不存在: $file"
        fi
    done
    
    # 统计文件
    local total_files=$(find . -type f -not -path "./.git/*" | wc -l)
    local code_files=$(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.py" \) -not -path "./.git/*" | wc -l)
    
    success "项目文件统计:"
    success "  - 总文件数: $total_files"
    success "  - 代码文件: $code_files"
}

check_git_status() {
    log "检查Git状态..."
    
    if [ -d ".git" ]; then
        # 检查当前分支
        local current_branch=$(git branch --show-current 2>/dev/null || echo "未设置")
        success "当前分支: $current_branch"
        
        # 检查远程仓库
        if git remote | grep -q "origin"; then
            local remote_url=$(git remote get-url origin)
            success "远程仓库: $remote_url"
        else
            warning "未配置远程仓库"
        fi
        
        # 检查未提交的变更
        local changes=$(git status --porcelain)
        if [ -n "$changes" ]; then
            warning "有未提交的变更:"
            echo "$changes" | sed 's/^/  /'
        else
            success "没有未提交的变更"
        fi
    else
        warning "当前目录不是Git仓库"
    fi
}

# 修复函数
fix_common_issues() {
    log "修复常见问题..."
    
    # 1. 修复Git仓库初始化
    if [ ! -d ".git" ]; then
        warning "初始化Git仓库..."
        git init
        success "Git仓库初始化完成"
    fi
    
    # 2. 修复远程仓库配置
    if ! git remote | grep -q "origin"; then
        warning "配置远程仓库..."
        git remote add origin https://github.com/yangxy679/CIS-Command-System.git
        success "远程仓库配置完成"
    fi
    
    # 3. 修复文件权限
    warning "修复脚本文件权限..."
    chmod +x scripts/*.sh 2>/dev/null || true
    success "脚本权限修复完成"
    
    # 4. 创建缺失的目录
    local missing_dirs=()
    for dir in "frontend/src" "backend/src" "data-platform" ".github/workflows"; do
        if [ ! -d "$dir" ]; then
            missing_dirs+=("$dir")
            mkdir -p "$dir"
        fi
    done
    
    if [ ${#missing_dirs[@]} -gt 0 ]; then
        success "创建缺失的目录: ${missing_dirs[*]}"
    fi
}

# 生成环境报告
generate_report() {
    log "生成环境检查报告..."
    
    local report_file="ENVIRONMENT_CHECK_REPORT.md"
    
    cat > "$report_file" << EOF
# CIS系统环境检查报告
## 生成时间: $(date)

## 系统信息
- 操作系统: $(uname -s) $(uname -r)
- 主机名: $(hostname)
- 当前用户: $(whoami)
- 工作目录: $(pwd)

## 环境检查结果

### Git环境
- Git安装: $(command -v git >/dev/null && echo "✅ 已安装" || echo "❌ 未安装")
- Git用户名: $(git config --global user.name 2>/dev/null || echo "未设置")
- Git邮箱: $(git config --global user.email 2>/dev/null || echo "未设置")

### GitHub连接
- GitHub访问: $(curl -s --head https://github.com | grep -q "200 OK" && echo "✅ 正常" || echo "❌ 失败")
- SSH密钥: $([ -f ~/.ssh/id_rsa.pub ] || [ -f ~/.ssh/id_ed25519.pub ] && echo "✅ 存在" || echo "❌ 未找到")

### Docker环境
- Docker安装: $(command -v docker >/dev/null && echo "✅ 已安装" || echo "❌ 未安装")
- Docker服务: $(docker info &>/dev/null && echo "✅ 运行中" || echo "❌ 未运行")
- Docker Compose: $(command -v docker-compose >/dev/null && echo "✅ 已安装" || echo "❌ 未安装")

### 开发环境
- Node.js: $(command -v node >/dev/null && echo "✅ $(node --version)" || echo "❌ 未安装")
- npm: $(command -v npm >/dev/null && echo "✅ $(npm --version)" || echo "❌ 未安装")
- Python: $(command -v python3 >/dev/null && echo "✅ $(python3 --version)" || echo "❌ 未安装")

### 项目状态
- Git仓库: $([ -d ".git" ] && echo "✅ 已初始化" || echo "❌ 未初始化")
- 远程仓库: $(git remote | grep -q "origin" && echo "✅ 已配置" || echo "❌ 未配置")
- 项目文件: $(find . -type f -not -path "./.git/*" | wc -l) 个文件
- 代码文件: $(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.py" \) -not -path "./.git/*" | wc -l) 个

## 发现的问题
$(if [ -d ".git" ] && [ -n "$(git status --porcelain)" ]; then
    echo "- 有未提交的变更"
    git status --porcelain | sed 's/^/  - /'
fi)

## 建议操作
1. 确保所有必要工具已安装
2. 配置Git用户信息（如果未配置）
3. 提交未提交的变更
4. 推送到GitHub仓库
5. 验证自动化工作流

## 自动化脚本
- 环境检查: ./scripts/env-check-and-fix.sh
- 自动上传: ./scripts/auto-upload.sh
- 开发启动: ./scripts/start-development.sh

---
*报告由CIS系统环境检查脚本生成*
EOF
    
    success "环境检查报告生成完成: $report_file"
}

# 主函数
main() {
    echo "开始环境检查..."
    echo ""
    
    # 执行检查
    check_git
    echo ""
    
    check_github
    echo ""
    
    check_docker
    echo ""
    
    check_node
    echo ""
    
    check_python
    echo ""
    
    check_project_structure
    echo ""
    
    check_git_status
    echo ""
    
    # 修复常见问题
    fix_common_issues
    echo ""
    
    # 生成报告
    generate_report
    echo ""
    
    echo "========================================"
    echo "🎉 环境检查完成！"
    echo ""
    echo "📋 下一步建议："
    echo "  1. 查看生成的报告: ENVIRONMENT_CHECK_REPORT.md"
    echo "  2. 运行自动上传脚本: ./scripts/auto-upload.sh"
    echo "  3. 启动开发环境: ./scripts/start-development.sh"
    echo "  4. 检查GitHub Actions工作流"
    echo ""
    echo "🔧 自动化脚本已就绪，可以全速开发！"
    echo "========================================"
}

# 执行主函数
main

# 设置脚本执行权限
chmod +x scripts/env-check-and-fix.sh