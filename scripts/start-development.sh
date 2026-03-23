#!/bin/bash

# CIS系统开发启动脚本
# 一键启动所有开发服务

echo "🎖️ CIS系统开发环境启动..."
echo "========================================"

# 检查Docker
echo "🐳 检查Docker环境..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，请先安装Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

echo "✅ Docker环境检查通过"
echo ""

# 检查项目文件
echo "📁 检查项目文件..."
required_files=("docker-compose.yml" "README.md" "frontend/package.json" "backend/package.json")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 缺少必要文件：$file"
        exit 1
    fi
done
echo "✅ 项目文件检查通过"
echo ""

# 显示服务列表
echo "📊 即将启动的服务："
echo "1. 🐘 PostgreSQL数据库 (5432)"
echo "2. 🟥 Redis缓存 (6379)"
echo "3. ⚛️  React前端 (3000)"
echo "4. 🏗️  NestJS后端 (3001)"
echo "5. 🐍 Python数据中台 (8000)"
echo "6. 📊 Airflow任务调度 (8080)"
echo "7. 🔍 Elasticsearch搜索 (9200)"
echo "8. 🖥️  Nginx反向代理 (80)"
echo "9. 📈 Prometheus监控 (9090)"
echo "10. 📊 Grafana可视化 (3002)"
echo ""

# 确认启动
read -p "⚠️  确认启动所有开发服务？(y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 启动取消"
    exit 0
fi

# 启动服务
echo "🚀 启动Docker服务..."
docker-compose up -d

echo ""
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
services=("postgres" "redis" "backend" "frontend" "data-platform" "elasticsearch")
all_healthy=true

for service in "${services[@]}"; do
    if docker ps --filter "name=cis-$service" --format "{{.Status}}" | grep -q "Up"; then
        echo "✅ $service 运行正常"
    else
        echo "❌ $service 启动失败"
        all_healthy=false
    fi
done

echo ""
if [ "$all_healthy" = true ]; then
    echo "🎉 所有服务启动成功！"
else
    echo "⚠️  部分服务启动异常，请检查日志"
fi

echo ""
echo "========================================"
echo "🌐 访问地址："
echo "前端应用：     http://localhost:3000"
echo "后端API：      http://localhost:3001"
echo "数据中台：     http://localhost:8000"
echo "Airflow UI：   http://localhost:8080"
echo "Grafana监控：  http://localhost:3002"
echo "Prometheus：   http://localhost:9090"
echo "Elasticsearch：http://localhost:9200"
echo ""
echo "🔧 管理命令："
echo "查看日志：     docker-compose logs -f [服务名]"
echo "停止服务：     docker-compose down"
echo "重启服务：     docker-compose restart"
echo "重建服务：     docker-compose up -d --build"
echo ""
echo "📊 服务状态："
docker-compose ps
echo ""
echo "🎖️ CIS系统开发环境已就绪！"