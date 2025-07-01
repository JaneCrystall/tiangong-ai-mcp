FROM node:22-alpine

RUN npm install -g @tiangong-ai/mcp-server@0.0.14

EXPOSE 9277

CMD ["tiangong-ai-mcp-http"]
