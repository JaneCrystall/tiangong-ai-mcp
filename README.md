# TianGong-AI-MCP

[中文](https://github.com/linancn/tiangong-ai-mcp/blob/main/README_CN.md) | [English](https://github.com/linancn/tiangong-ai-mcp/blob/main/README.md)

TianGong AI Model Context Protocol (MCP) Server supports Streamable Http protocol.

## Starting MCP Server

### Streamable Http Server

```bash
npm install -g @tiangong-ai/mcp-server@latest

npx dotenv -e .env -- \
npx -p @tiangong-ai/mcp-server tiangong-ai-mcp-http
```

### Local Development Server

From this repository you can build and launch the HTTP server alongside the Inspector with:

```bash
npm run start:server
```

### Launch MCP Inspector

```bash
npx @modelcontextprotocol/inspector
```
