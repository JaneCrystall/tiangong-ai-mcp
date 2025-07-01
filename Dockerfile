FROM node:22-alpine

RUN npm install -g @tiangong-ai/mcp-server@latest

EXPOSE 9277

CMD ["tiangong-ai-mcp-http"]
