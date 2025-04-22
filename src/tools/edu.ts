import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import cleanObject from '../_shared/clean_object.js';
import { base_url, supabase_anon_key, x_api_key, x_region } from '../_shared/config.js';

const input_schema = {
  query: z.string().min(1).describe('Requirements or questions from the user.'),
  topK: z.number().default(5).describe('Number of top chunk results to return.'),
  extK: z
    .number()
    .default(0)
    .describe('Number of additional chunks to include before and after each topK result.'),
  filter: z
    .object({
      rec_id: z.array(z.string()).optional().describe('Filter by record ID.'),
      course: z.array(z.string()).optional().describe('Filter by course.'),
    })
    .optional()
    .describe(
      'DO NOT USE IT IF NOT EXPLICIT REQUESTED IN THE QUERY. Optional filter conditions for specific fields, as an object with optional arrays of values.',
    ),
};

async function searchEdu({
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
    course?: string[];
  };
}): Promise<string> {
  const url = `${base_url}/edu_search`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabase_anon_key}`,
        'x-api-key': x_api_key,
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

export function regEduTool(server: McpServer) {
  server.tool(
    'Search_Edu_Tool',
    'Search the environmental educational materials database for information.',
    input_schema,
    async ({ query, topK, extK, filter }, extra) => {
      const result = await searchEdu({
        query,
        topK,
        extK,
        filter,
      });
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
