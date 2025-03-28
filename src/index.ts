import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { regWeaviateTool } from './tools/weaviate.js';

const server = new McpServer({
  name: 'Echo',
  version: '1.0.0',
});

regWeaviateTool(server);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
