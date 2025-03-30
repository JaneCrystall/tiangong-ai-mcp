# TianGong-AI-MCP

TinaGong AI Model Context Protocol Server, both STDIO and SSE are supported.

## Env Preparing

```bash
# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
nvm install 22
nvm use

# Install packages
npm install

# Update packages
npm update && npm ci
```

## Code Prettier

```bash
# Format code
npm run lint
```

## Local Test

### STDIO Server

```bash
# Start STDIO Server with MCP Inspector
npm run start
```

### SSE Server

```bash
# Start SSE (You may need to install supergateway)
npm install supergateway
npm install @tiangong-ai/mcp-server

# --baseUrl is supposed to be real ip or domain name
npx -y supergateway \
    --stdio "npx -y @tiangong-ai/mcp-server" \
    --port 3001 --baseUrl http://localhost:3001 \
    --ssePath /sse --messagePath /message

# Start MCP Inspector
npx @modelcontextprotocol/inspector
```

## Publish

```bash
npm login

npm run build && npm publish
```
