# ⚡ CIS作战指挥系统 - 快速启动指南

## 🎯 **项目概述**
**CIS作战指挥系统**是一个虚拟Agent军团的作战指挥系统，同时也是软件公司的战略指挥平台。

## 🚀 **5分钟快速开始**

### **前提条件**
- Node.js 18+ 
- Docker 20.10+
- Git 2.30+

### **步骤1：环境检查**
```bash
# 检查Node.js版本
node --version

# 检查Docker版本
docker --version

# 检查Git版本
git --version
```

### **步骤2：启动开发环境**
```bash
# 进入项目目录
cd CIS-Command-System

# 安装依赖
npm install

# 启动所有服务（数据库、Redis、后端、前端）
npm run docker:up

# 或者使用docker-compose直接启动
docker-compose up -d
```

### **步骤3：访问应用**
- **前端应用**：http://localhost:5173
- **后端API**：http://localhost:3000
- **API文档**：http://localhost:3000/api/docs

## 📁 **项目结构速览**

```
CIS-Command-System/
├── frontend/          # React 18 + TypeScript + Ant Design
│   ├── src/          # 源代码目录
│   │   ├── components/ # 可复用组件
│   │   ├── pages/     # 页面组件
│   │   ├── store/     # Redux状态管理
│   │   └── services/  # API服务
│   └── package.json  # 前端依赖配置
├── backend/          # NestJS + PostgreSQL + Redis
├── docs/             # 项目文档
├── infrastructure/   # 部署配置
└── docker-compose.yml # 开发环境配置
```

## 🔧 **核心功能模块**

### **已实现功能**
1. **项目基础框架** - 完整的开发环境配置
2. **前端架构** - React + TypeScript + Redux
3. **容器化部署** - Docker Compose一键启动
4. **CI/CD流水线** - GitHub Actions自动化

### **待开发功能**
1. **用户管理系统** - 登录/注册/权限
2. **组织架构管理** - 部门/角色/人员
3. **任务指挥系统** - Agent任务分配与监控
4. **数据分析面板** - 实时数据可视化

## 🎨 **技术特色**

### **前端技术栈**
- **React 18** - 最新React特性
- **TypeScript** - 类型安全
- **Ant Design Pro** - 企业级UI组件
- **Vite** - 极速构建工具
- **Tailwind CSS** - 实用优先的CSS框架

### **后端技术栈**
- **NestJS** - 企业级Node.js框架
- **PostgreSQL** - 关系型数据库
- **Redis** - 高性能缓存
- **Prisma** - 现代化ORM
- **JWT** - 安全认证

### **开发工具**
- **Docker** - 容器化开发环境
- **GitHub Actions** - 自动化CI/CD
- **ESLint + Prettier** - 代码规范
- **Jest + Vitest** - 单元测试

## 📊 **开发进度**

### **当前阶段**：项目初始化
- ✅ GitHub仓库创建
- ✅ 项目结构设计
- ✅ 前端基础框架
- 🔄 后端项目初始化（进行中）
- 🔄 数据库设计（进行中）

### **第一周目标**（3月26日）
- ✅ 可运行的开发环境
- 🔄 用户登录/注册功能
- 🔄 基础权限控制
- 🔄 组织架构管理

## 👥 **开发团队**

### **核心团队（5人）**
1. **产品总监** - 需求与产品设计
2. **前端架构师** - 界面与用户体验
3. **后端架构师** - 系统架构与API
4. **数据架构师** - 数据库与数据分析
5. **测试经理** - 质量保障与测试

### **开发模式**
- **敏捷开发**：2周一个迭代
- **代码审查**：所有PR必须审查
- **自动化测试**：CI/CD集成测试
- **每日站会**：9:00 AM进度同步

## 🔐 **安全特性**

### **已实现安全措施**
1. **环境变量管理** - 敏感信息隔离
2. **Docker安全配置** - 最小权限原则
3. **代码扫描** - 自动化安全检查
4. **依赖审计** - 定期安全更新

### **计划中的安全措施**
1. **双重认证** - 用户登录安全
2. **API限流** - 防止滥用攻击
3. **数据加密** - 敏感数据保护
4. **审计日志** - 操作记录追踪

## 📈 **性能指标**

### **前端性能目标**
- 首次加载时间：< 2秒
- 交互响应时间：< 100ms
- 包体积：< 500KB (gzipped)

### **后端性能目标**
- API响应时间：< 50ms (p95)
- 数据库查询：< 20ms
- 并发用户数：> 1000

## 🆘 **故障排除**

### **常见问题**
```bash
# 端口冲突
# 修改docker-compose.yml中的端口映射

# 数据库连接失败
docker-compose logs postgres

# 依赖安装失败
rm -rf node_modules && npm cache clean --force && npm install

# Docker构建失败
docker system prune -a
```

### **获取帮助**
1. 查看详细文档：`docs/development-setup.md`
2. 检查项目状态：`docs/project-status.md`
3. 创建GitHub Issue报告问题

## 🎖️ **项目愿景**
打造一个高效、安全、可扩展的虚拟Agent军团作战指挥系统，为软件公司提供全面的战略指挥能力。

---

**虚拟Agent军团，随时待命！** 🚀