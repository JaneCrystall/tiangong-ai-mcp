import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import weaviate from 'weaviate-client';
import { z } from 'zod';

export function regWeaviateTool(server: McpServer) {
  server.tool(
    'weaviate',
    { query: z.string(), topK: z.number(), extK: z.number() },
    async ({ query, topK, extK }) => {
      const client = await weaviate.connectToCustom({
        httpHost: 'localhost',
        httpPort: 8080,
        grpcHost: 'localhost',
        grpcPort: 50051,
        // grpcSecure: true,
        // httpSecure: true,
        // authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_API_KEY'),
        // headers: {
        //   'X-Cohere-Api-Key': Deno.env.get('COHERE_API_KEY') ?? ''
        // }
      });

      const collection = client.collections.get('audit');
      const result = await collection.query.hybrid('food', {
        limit: 2,
      });

      return {
        content: [{ type: 'object', result: result }],
      };
    },
  );
}
