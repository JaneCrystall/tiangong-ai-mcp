#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
// import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
// import express, { Request, Response } from 'express';
import { regWeaviateTool } from './tools/weaviate.js';

const server = new McpServer({
  name: 'TianGong-MCP-Server',
  version: '1.0.0',
});

regWeaviateTool(server);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch((error) => {
  console.error('Fatal error running server:', error);
  process.exit(1);
});

// const app = express();

// const transports: { [sessionId: string]: SSEServerTransport } = {};

// app.get('/sse', async (_: Request, res: Response) => {
//   const transport = new SSEServerTransport('/messages', res);
//   transports[transport.sessionId] = transport;
//   res.on('close', () => {
//     delete transports[transport.sessionId];
//   });
//   await server.connect(transport);
// });

// app.post('/messages', async (req: Request, res: Response) => {
//   const sessionId = req.query.sessionId as string;
//   const transport = transports[sessionId];
//   if (transport) {
//     await transport.handlePostMessage(req, res);
//   } else {
//     res.status(400).send('No transport found for sessionId');
//   }
// });

// app.listen(3001);
