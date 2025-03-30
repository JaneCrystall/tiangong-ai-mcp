FROM node:22

RUN npm install -g @tiangong-ai/mcp-server supergateway

EXPOSE 3001

CMD ["sh", "-c", "npx -y supergateway --stdio 'npx -y @tiangong-ai/mcp-server' --port 3001 --baseUrl http://localhost:3001 --ssePath /sse --messagePath /message"]