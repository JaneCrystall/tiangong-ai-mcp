#!/usr/bin/env node

import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express, { NextFunction, Request, Response } from 'express';
import { authenticateRequest } from './_shared/auth_middleware.js';
import { getServer } from './_shared/init_server_http.js';

interface AuthenticatedRequest extends Request {
  bearerKey?: string;
}

const authenticateBearer = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const xApiKeyHeader = req.headers['x-api-key'];

  // Support either Authorization: Bearer <token> or x-api-key: <token>
  let bearerKey: string | undefined;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    bearerKey = authHeader.substring(7).trim();
  } else if (typeof xApiKeyHeader === 'string' && xApiKeyHeader.trim().length > 0) {
    bearerKey = xApiKeyHeader.trim();
  }

  if (!bearerKey) {
    res.status(401).json({
      jsonrpc: '2.0',
      error: {
        code: -32001,
        message: 'Missing credentials: provide Authorization: Bearer <token> or x-api-key header',
      },
      id: null,
    });
    return;
  }
  const authResult = await authenticateRequest(bearerKey);

  if (!authResult || !authResult.isAuthenticated) {
    res.status(403).json({
      jsonrpc: '2.0',
      error: {
        code: -32002,
        message: authResult?.response || 'Forbidden',
      },
      id: null,
    });
    return;
  }

  req.bearerKey = bearerKey;
  next();
};

const app = express();
app.use(express.json());

app.post('/mcp', authenticateBearer, async (req: AuthenticatedRequest, res: Response) => {
  try {
    // console.log('Received POST MCP request');
    // console.log('Request body:', req.body);
    // console.log('Request headers:', req.headers);
    // console.log('Request method:', req.method);
    const server = getServer(req.bearerKey);
    const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
    res.on('close', () => {
      console.log('Request closed');
      transport.close();
      server.close();
    });
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

app.get('/mcp', async (req: Request, res: Response) => {
  console.log('Received GET MCP request');
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Method not allowed.',
      },
      id: null,
    }),
  );
});

app.delete('/mcp', async (req: Request, res: Response) => {
  console.log('Received DELETE MCP request');
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Method not allowed.',
      },
      id: null,
    }),
  );
});

app.get('/health', async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
  });
});

// Start the server
const PORT = Number(process.env.PORT ?? 9277);
const HOST = process.env.HOST ?? '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});
