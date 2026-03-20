# 开发环境Dockerfile
FROM node:18-alpine As development

WORKDIR /app

# 复制package文件
COPY package*.json ./
COPY prisma ./prisma/

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 生成Prisma客户端
RUN npx prisma generate

# 开发模式启动
CMD ["npm", "run", "start:dev"]

# 生产环境构建
FROM node:18-alpine As build

WORKDIR /app

# 复制package文件
COPY package*.json ./
COPY prisma ./prisma/

# 安装生产依赖
RUN npm ci --only=production

# 复制开发阶段node_modules（包含构建工具）
COPY --from=development /app/node_modules ./node_modules

# 复制源代码
COPY . .

# 生成Prisma客户端
RUN npx prisma generate

# 构建应用
RUN npm run build

# 生产环境运行
FROM node:18-alpine As production

WORKDIR /app

# 复制package文件
COPY package*.json ./
COPY prisma ./prisma/

# 安装生产依赖
RUN npm ci --only=production

# 复制构建产物
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# 设置非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
USER nestjs

# 启动应用
CMD ["node", "dist/main"]