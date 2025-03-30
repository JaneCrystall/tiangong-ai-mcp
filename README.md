# TianGong-AI-MCP

TianGong AI Model Context Protocol (MCP) Server 支持 STDIO 和 SSE 两种协议。

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

### SSE 服务器

```bash
# 启动 SSE 服务器（可能需要安装 supergateway）
npm install supergateway
npm install @tiangong-ai/mcp-server

# 参数 --baseUrl 应设置为有效的 IP 地址或域名
npx -y supergateway \
    --stdio "npx -y @tiangong-ai/mcp-server" \
    --port 3001 --baseUrl http://localhost:3001 \
    --ssePath /sse --messagePath /message

# 启动 MCP Inspector
npx @modelcontextprotocol/inspector
```

## 发布

```bash
npm login

npm run build && npm publish
