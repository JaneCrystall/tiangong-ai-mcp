# TianGong-AI-MCP

[中文](./README.md) | [English](./README_EN.md)

TianGong AI Model Context Protocol (MCP) Server supports both STDIO and SSE protocols.

## Environment Setup

```bash
# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
nvm install 22
nvm use

# Install dependencies
npm install

# Update dependencies
npm update && npm ci
```

## Code Formatting

```bash
# Format code using the linter
npm run lint
```

## Local Testing

### STDIO Server

```bash
# Start the STDIO Server with MCP Inspector
npm run start
```

### SSE Server

```bash
# Start the SSE Server (you might need to install supergateway)
npm install supergateway
npm install @tiangong-ai/mcp-server

# The --baseUrl should be set to a valid IP address or domain name
npx -y supergateway \
    --stdio "npx -y @tiangong-ai/mcp-server" \
    --port 3001 --baseUrl http://localhost:3001 \
    --ssePath /sse --messagePath /message

# Launch MCP Inspector
npx @modelcontextprotocol/inspector
```

## Publishing

```bash
npm login

npm run build && npm publish
```
