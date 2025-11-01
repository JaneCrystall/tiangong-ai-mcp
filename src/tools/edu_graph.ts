import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import cleanObject from '../_shared/clean_object.js';
import { supabase_base_url, x_region } from '../_shared/config.js';

const input_schema = {
  query: z.string().min(1).describe('User query text.'),
  root: z
    .number()
    .default(1)
    .describe('Number of root concepts to include when traversing the knowledge graph.'),
  depth: z
    .number()
    .default(3)
    .describe('Number of hops to expand from each root concept.'),
};

async function searchEduGraph(
  {
    query,
    root,
    depth,
  }: {
    query: string;
    root: number;
    depth: number;
  },
  bearerKey?: string,
): Promise<string> {
  const url = `${supabase_base_url}/functions/v1/edu_graph_search`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(bearerKey && { 'x-api-key': bearerKey }),
        'x-region': x_region,
      },
      body: JSON.stringify(
        cleanObject({
          query,
          root,
          depth,
        }),
      ),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    console.error('Error making the request:', error);
    throw error;
  }
}

export function regEduGraphTool(server: McpServer, bearerKey?: string) {
  server.tool(
    'Search_Edu_Graph_Tool',
    'Search the education knowledge graph for related concepts.',
    input_schema,
    async ({ query, root, depth }, extra) => {
      const result = await searchEduGraph(
        {
          query,
          root,
          depth,
        },
        bearerKey,
      );
      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    },
  );
}
