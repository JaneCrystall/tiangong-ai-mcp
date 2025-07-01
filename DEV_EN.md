# TianGong-AI-MCP

[中文](https://github.com/linancn/tiangong-ai-mcp/blob/main/DEV_CN.md) | [English](https://github.com/linancn/tiangong-ai-mcp/blob/main/DEV_EN.md)

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
# Launch the STDIO Server using MCP Inspector
npm start
```

### Launch MCP Inspector

```bash
npx @modelcontextprotocol/inspector
```

## NPM Publishing

```bash
npm login

npm run build && npm publish

```

## Docker Deployment

```bash
docker build --no-cache -t 339712838008.dkr.ecr.us-east-1.amazonaws.com/tiangong-ai-mcp:0.0.14 .

aws ecr get-login-password --region us-east-1  | docker login --username AWS --password-stdin 339712838008.dkr.ecr.us-east-1.amazonaws.com

docker push 339712838008.dkr.ecr.us-east-1.amazonaws.com/tiangong-ai-mcp:0.0.14

docker run -d -p 80:80 -e 339712838008.dkr.ecr.us-east-1.amazonaws.com/tiangong-ai-mcp:0.0.14
```
