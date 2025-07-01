import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { regEduTool } from '../tools/edu.js';
import { regESGTool } from '../tools/esg.js';
import { regSciTool } from '../tools/sci.js';

export function initializeServer(bearerKey?: string): McpServer {
  const server = new McpServer({
    name: 'TianGong-AI-MCP-Server',
    version: '1.0.0',
  });

  regEduTool(server, bearerKey);
  regESGTool(server, bearerKey);
  regSciTool(server, bearerKey);

  return server;
}

export function getServer(bearerKey?: string) {
  return initializeServer(bearerKey);
}
