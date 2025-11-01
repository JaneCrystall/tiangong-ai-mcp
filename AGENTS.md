# TianGong AI MCP – Agent Handbook

## Project Overview
- Provides a Model Context Protocol (MCP) server that exposes TianGong AI search capabilities over the Streamable HTTP transport.
- The entry point is `src/index_server.ts`, which runs an Express server on `PORT` (default `9277`) and serves a `/mcp` endpoint protected by bearer or `x-api-key` headers.
- Tools are registered via `src/_shared/init_server_http.ts` and backed by Supabase Edge Functions; results are streamed back to MCP clients.

## Available MCP Tools
- `Search_ESG_Tool`: Retrieve ESG report chunks; supports `metaContains`, metadata `filter` (record ID, country), and `dateFilter` on `publication_date`. Only apply optional parameters when users explicitly request scoping.
- `Search_Sci_Tool`: Search academic publications with optional `filter` by journal / DOI plus `dateFilter` on `date`.
- `Search_Edu_Tool`: Surface environmental education resources; optional `filter` targets `rec_id` or `course`.
- `Search_Edu_Graph_Tool`: Traverse the education knowledge graph; configure `root` (entry points) and `depth` (hops) to expand related concepts.
- `Search_Report_Tool`: Explore sustainability and policy reports with optional filters for `rec_id`, `organization`, or `title`.
- `Search_Green_Deal_Tool`: Query EU Green Deal documentation; optional filters include `rec_id`, `document_id`, `issue_agency`, `tags`, and `title`.
- `Search_Internal_Tool`: Look up internal knowledge-base content; optional filters allow `rec_id` or `title`.
- `Search_Patent_Tool`: Search patent abstracts/metadata with optional `filter` on `country` or `title` and `dateFilter` on `publication_date`.
- `Search_Standard_Tool`: Access environmental / sustainability standards; optional `metaContains`, metadata `filter` (record ID, organization, standard number, title), and `dateFilter` on `effective_date`.
- `Search_Textbook_Tool`: Retrieve curated environmental textbook material; optional metadata filters (`rec_id`, `title`, `author`, `company_name`, `isbn_number`) plus `dateFilter` on `publication_date`.
- All tools sanitize optional arguments with `clean_object.ts` before invoking Supabase Edge Functions.

## Runtime & Dependencies
- TypeScript project targeting Node.js ≥ 18 (dev docs use Node 22 via `nvm`).
- Key dependencies: `@modelcontextprotocol/sdk` (MCP transport), `express` (HTTP server), `zod` (input validation), `@supabase/supabase-js` (auth), `@upstash/redis` (token cache).
- Dev tooling: `typescript`, `prettier`, `dotenv-cli`, `npm-check-updates`, `@modelcontextprotocol/inspector`.

## Environment Configuration
Set the following variables (see `src/_shared/config.ts`); defaults exist for local prototyping but production should override them:

```
SUPABASE_BASE_URL
SUPABASE_PUBLISHABLE_KEY
UPSTASH_REDIS_URL
UPSTASH_REDIS_TOKEN
X_REGION
PORT
HOST
LOCAL_DEPLOYMENT_URL / REMOTE_DEPLOYMENT_URL
LOCAL_LANGSMITH_API_KEY / REMOTE_LANGSMITH_API_KEY
```

Authentication expects either:
1. A bearer token that Supabase recognizes (`supabase.auth.getUser`), or
2. A base64-encoded JSON `{ "email": "...", "password": "..." }` string which is cached in Upstash Redis after Supabase verification.

## Development Workflow
1. `npm install` – installs runtime + dev dependencies.
2. `npm run build` – compiles TypeScript to `dist/` and makes binaries executable.
3. `npm start` – runs the STDIO MCP server alongside the Inspector for quick local testing.
4. `npm run start:server` – builds and launches the HTTP server plus Inspector (requires `.env` with auth info).
5. `npm run lint` – formats with Prettier (configured to write changes).

Use `src/test.ts` as a reference client that connects to `http://localhost:9277/mcp` via the streamable HTTP transport.

## Deployment Notes
- Dockerfile builds the server and exposes port `9277`; follow `DEV_EN.md` for AWS ECR publishing commands.
- NPM package exposes `tiangong-ai-mcp-http` (see `package.json` `bin`) landing in `dist/src/index_server.js`.
- When publishing, run `npm run build && npm publish` after authenticating with NPM.

## Additional References
- Developer guides: `DEV_EN.md`, `DEV_CN.md`.
- Public README: `README.md` / `README_CN.md`.
- MCP SDK documentation: <https://modelcontextprotocol.io>
