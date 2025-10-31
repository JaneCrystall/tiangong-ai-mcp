import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import cleanObject from '../_shared/clean_object.js';
import { supabase_base_url, x_region } from '../_shared/config.js';

const input_schema = {
  query: z.string().min(1).describe('Requirements or questions from the user.'),
  topK: z.number().default(5).describe('Number of top chunk results to return.'),
  extK: z
    .number()
    .default(0)
    .describe('Number of additional chunks to include before and after each topK result.'),
  metaContains: z
    .string()
    .optional()
    .describe(
      'An optional keyword string used for fuzzy searching within document metadata, such as standard titles or issuing organizations. DO NOT USE IT BY DEFAULT.',
    ),
  filter: z
    .object({
      rec_id: z.array(z.string()).optional().describe('Filter by record ID.'),
      organization: z.array(z.string()).optional().describe('Filter by issuing organization.'),
      standard_number: z.array(z.string()).optional().describe('Filter by standard number.'),
      title: z.array(z.string()).optional().describe('Filter by standard title.'),
    })
    .optional()
    .describe(
      'DO NOT USE IT IF NOT EXPLICIT REQUESTED IN THE QUERY. Optional filter conditions for specific metadata fields.',
    ),
  dateFilter: z
    .object({
      effective_date: z
        .object({
          gte: z.number().optional(),
          lte: z.number().optional(),
        })
        .optional()
        .describe('Filter effective date lower/upper bounds (UNIX timestamp).'),
    })
    .optional()
    .describe(
      'DO NOT USE IT IF NOT EXPLICIT REQUESTED IN THE QUERY. Optional date range filters keyed by effective date in UNIX timestamps.',
    ),
};

async function searchStandard(
  {
    query,
    topK,
    extK,
    metaContains,
    filter,
    dateFilter,
  }: {
    query: string;
    topK: number;
    extK: number;
    metaContains?: string;
    filter?: {
      rec_id?: string[];
      organization?: string[];
      standard_number?: string[];
      title?: string[];
    };
    dateFilter?: {
      effective_date?: {
        gte?: number;
        lte?: number;
      };
    };
  },
  bearerKey?: string,
): Promise<string> {
  const url = `${supabase_base_url}/functions/v1/standard_search`;
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
          meta_contains: metaContains,
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

export function regStandardTool(server: McpServer, bearerKey?: string) {
  server.tool(
    'Search_Standard_Tool',
    'Search environmental and sustainability standards with metadata-aware filtering.',
    input_schema,
    async ({ query, topK, extK, metaContains, filter, dateFilter }, extra) => {
      const result = await searchStandard(
        {
          query,
          topK,
          extK,
          metaContains,
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
