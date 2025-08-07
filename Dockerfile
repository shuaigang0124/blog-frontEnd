# 构建阶段
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# 确保此命令生成 dist 目录
RUN npm run build

# 生产阶段
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist ./dist
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]