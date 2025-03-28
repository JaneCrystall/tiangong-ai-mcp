import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import weaviate from 'weaviate-client'
import { z } from 'zod';

export function regWeaviateTool(server: McpServer) {
  server.tool('weaviate', { query: z.string(),topK: z.number, extK: z.number }, async ({ message }) => ({
    content: [{ type: 'text', text: `Tool echo: ${message}` }],
  }));
}
