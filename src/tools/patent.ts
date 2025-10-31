import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import cleanObject from '../_shared/clean_object.js';
import { supabase_base_url, x_region } from '../_shared/config.js';

const input_schema = {
  query: z.string().min(1).describe('Requirements or questions from the user.'),
  topK: z.number().default(5).describe('Number of top chunk results to return.'),
  filter: z
    .object({
      country: z.array(z.string()).optional().describe('Filter by patent country code.'),
      title: z.array(z.string()).optional().describe('Filter by patent title.'),
    })
    .optional()
    .describe(
      'DO NOT USE IT IF NOT EXPLICIT REQUESTED IN THE QUERY. Optional filter conditions for specific metadata fields.',
    ),
  dateFilter: z
    .object({
      publication_date: z
        .object({
          gte: z.number().optional(),
          lte: z.number().optional(),
        })
        .optional()
        .describe('Filter publication date lower/upper bounds (UNIX timestamp).'),
    })
    .optional()
    .describe(
      'DO NOT USE IT IF NOT EXPLICIT REQUESTED IN THE QUERY. Optional date range filters keyed by publication date in UNIX timestamps.',
    ),
};

async function searchPatent(
  {
    query,
    topK,
    filter,
    dateFilter,
  }: {
    query: string;
    topK: number;
    filter?: {
      country?: string[];
      title?: string[];
    };
    dateFilter?: {
      publication_date?: {
        gte?: number;
        lte?: number;
      };
    };
  },
  bearerKey?: string,
): Promise<string> {
  const url = `${supabase_base_url}/functions/v1/patent_search`;
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
          filter,
          datefilter: dateFilter,
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

export function regPatentTool(server: McpServer, bearerKey?: string) {
  server.tool(
    'Search_Patent_Tool',
    'Search patent abstracts and metadata by technology, jurisdiction, or time window.',
    input_schema,
    async ({ query, topK, filter, dateFilter }, extra) => {
      const result = await searchPatent(
        {
          query,
          topK,
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
