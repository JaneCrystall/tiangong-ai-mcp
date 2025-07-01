FROM node:22-alpine

RUN npm install -g @tiangong-ai/mcp-server@latest

EXPOSE 9277

CMD ["npx", "-p", "@tiangong-ai-mcp-server", "tiangong-ai-mcp-http"]
