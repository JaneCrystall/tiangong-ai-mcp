# TianGong-AI-MCP

TinaGong AI Message Control Protocol

## Env Preparing

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22
nvm use

npm install

# Update packages
npm update && npm ci

# start local instance with .env.local
npm start

# Code Prettier
npm run lint

```

## Local Test

```bash
# Start STDIO
npm run start

# Start SSE
npm install @tiangong-ai/mcp-server
npx -y supergateway \
    --stdio "npx -y @tiangong-ai/mcp-server" \
    --port 3001 --baseUrl http://localhost:3001 \
    --ssePath /sse --messagePath /message
```

## Publish

```bash
npm run build && npm publish
```
