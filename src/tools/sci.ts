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
      journal: z.array(z.string()).optional().describe('Filter by journal.'),
      doi: z.array(z.string()).optional().describe('Filter by DOI.'), // 新增 DOI 筛选条件
    })
    .optional()
    .describe('Optional metadata filters (arrays of values per field). Use only when the user explicitly requests scoped results.'),
  dateFilter: z
    .object({
      date: z
        .object({
          gte: z.number().optional(),
          lte: z.number().optional(),
        })
        .optional(),
    })
    .optional()
    .describe(
      'Optional date range filters in UNIX timestamps (seconds). Use only when the user explicitly requests date constraints. Examples: {"dateFilter":{"date":{"gte":1262304000}}}, {"dateFilter":{"date":{"lte":1262304000}}}, {"dateFilter":{"date":{"gte":1262304000,"lte":1577836800}}}.',
    ),
};

async function searchSci(
  {
    query,
    topK,
    extK,
    filter,
    dateFilter,
  }: {
    query: string;
    topK: number;
    extK: number;
    filter?: {
      journal?: string[];
      doi?: string[];
    };
    dateFilter?: {
      date?: {
        gte?: number;
        lte?: number;
      };
    };
  },
  bearerKey?: string,
): Promise<string> {
  const url = `${supabase_base_url}/functions/v1/sci_search`;
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
          dateFilter,
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

export function regSciTool(server: McpServer, bearerKey?: string) {
  server.tool(
    'Search_Sci_Tool',
    'Search academic publications for scientific findings.',
    input_schema,
    async ({ query, topK, extK, filter, dateFilter }, extra) => {
      const result = await searchSci(
        {
          query,
          topK,
          extK,
          filter,
          dateFilter,
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
