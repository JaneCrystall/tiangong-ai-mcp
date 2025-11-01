# TianGong-AI-MCP

[中文](https://github.com/linancn/tiangong-ai-mcp/blob/main/README_CN.md) | [English](https://github.com/linancn/tiangong-ai-mcp/blob/main/README.md)

TianGong AI Model Context Protocol (MCP) Server 支持 Streamable Http 协议。

## 启动 MCP 服务器

### Streamable Http 服务器

```bash
npm install -g @tiangong-ai/mcp-server@latest

npx dotenv -e .env -- \
npx -p @tiangong-ai/mcp-server tiangong-ai-mcp-http
```

### 本地开发服务器

在仓库本地开发时，可通过以下命令构建并启动 HTTP 服务器，并自动打开 Inspector：

```bash
npm run start:server
```

### 启动 MCP Inspector

```bash
npx @modelcontextprotocol/inspector
```
