import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import cleanObject from '../_shared/clean_object.js';
import { supabase_base_url, x_region } from '../_shared/config.js';

const input_schema = {
  query: z.string().min(1).describe('User query text.'),
  topK: z.number().default(5).describe('Number of top chunk results to return.'),
  extK: z
    .number()
    .default(0)
    .describe('Number of additional chunks to include before and after each topK result.'),
  filter: z
    .object({
      rec_id: z.array(z.string()).optional().describe('Filter by record ID.'),
      title: z.array(z.string()).optional().describe('Filter by document title.'),
    })
    .optional()
    .describe('Optional metadata filters (arrays of values per field). Use only when the user explicitly requests scoped results.'),
};

async function searchInternal(
  {
    query,
    topK,
    extK,
    filter,
  }: {
    query: string;
    topK: number;
    extK: number;
    filter?: {
      rec_id?: string[];
      title?: string[];
    };
  },
  bearerKey?: string,
): Promise<string> {
  const url = `${supabase_base_url}/functions/v1/internal_search`;
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
          topK,
          extK,
          filter,
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

export function regInternalTool(server: McpServer, bearerKey?: string) {
  server.tool(
    'Search_Internal_Tool',
    'Search the internal knowledge base for organization content.',
    input_schema,
    async ({ query, topK, extK, filter }, extra) => {
      const result = await searchInternal(
        {
          query,
          topK,
          extK,
          filter,
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
