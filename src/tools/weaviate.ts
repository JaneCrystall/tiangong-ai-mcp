import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import weaviate from 'weaviate-client';
import { z } from 'zod';

export function regWeaviateTool(server: McpServer) {
  server.tool(
    'weaviate',
    'Search Weaviate database with hybrid search',
    { collection: z.string(), query: z.string(), topK: z.number(), extK: z.number() },
    async ({ collection, query, topK, extK }, extra) => {
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

      const index = client.collections.get(collection);
      const result = await index.query.hybrid(query, {
        targetVector: 'content',
        queryProperties: ['content'],
        alpha: 0.3,
        returnMetadata: ['score', 'explainScore'],
        limit: topK,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
