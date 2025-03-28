# TianGong-AI-MCP

## Env Preparing

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 20
nvm use

curl -fsSL https://deno.land/install.sh | sh -s v1.45.2 # Then manually add the deno directory to your $HOME/.zshrc (or similar)

npm install

# Update packages
npm update && npm ci

deno cache --reload *.ts

# start local instance with .env.local
npm run start

# Code Prettier
npm run lint

```

## Clear Deno cache

```bash
deno info
rm -rf ~/Library/Caches/deno # for macOS
rm -rf ~/.cache/deno # for Linux
```

## Local Test

```bash
# Start Supabase Edge Functions Server
npm run start

# Equals
npx @modelcontextprotocol/inspector deno run --allow-all --import-map supabase/src/deno.json --env --watch supabase/src/index.ts
```

OR

Edit .env file refer to .env.example then use REST Client extension of VSCode to test the API in test.local.http.

## Docker Deployment on AWS ECS Fargate

```bash
docker build -t 339712838008.dkr.ecr.us-east-1.amazonaws.com/supabase/edge-runtime:v20240715 .

docker run -p 8000:8000 339712838008.dkr.ecr.us-east-1.amazonaws.com/supabase/edge-runtime:v20240715
```
