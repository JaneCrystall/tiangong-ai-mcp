# TianGong-AI-MCP

[中文](https://github.com/linancn/tiangong-ai-mcp/blob/main/DEV_CN.md) | [English](https://github.com/linancn/tiangong-ai-mcp/blob/main/DEV_EN.md)

## 环境设置

```bash
# 安装 Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
nvm install 22
nvm use

# 安装依赖
npm install

# 更新依赖
npm update && npm ci
```

## 代码格式化

```bash
# 使用代码检查工具格式化代码
npm run lint
```

## 本地测试

### STDIO 服务器

```bash
# 使用 MCP Inspector 启动 STDIO 服务器
npm run start
```

### 启动 MCP Inspector

```bash
npx @modelcontextprotocol/inspector
```

## NPM发布

```bash
npm login

npm run build && npm publish
```

## Dcoker发布

```bash
docker build --no-cache -t 339712838008.dkr.ecr.us-east-1.amazonaws.com/tiangong-ai-mcp:latest .

aws ecr get-login-password --region us-east-1  | docker login --username AWS --password-stdin 339712838008.dkr.ecr.us-east-1.amazonaws.com

docker push 339712838008.dkr.ecr.us-east-1.amazonaws.com/tiangong-ai-mcp:latest

docker run -d -p 9277:9277 --env-file .env 339712838008.dkr.ecr.us-east-1.amazonaws.com/tiangong-ai-mcp:latest
```
