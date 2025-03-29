# TianGong-AI-MCP

## Env Preparing

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22
nvm use

npm install

# Update packages
npm update && npm ci

# start local instance with .env.local
npm start

# Code Prettier
npm run lint

```

## Local Test

```bash
# Start Supabase Edge Functions Server
npm run start
```

## Publish

```bash
npm run build
npm publish
```

Edit .env file refer to .env.example then use REST Client extension of VSCode to test the API in test.local.http.

## Docker Deployment on AWS ECS Fargate

```bash
docker build -t 339712838008.dkr.ecr.us-east-1.amazonaws.com/supabase/edge-runtime:v20240715 .

docker run -p 8000:8000 339712838008.dkr.ecr.us-east-1.amazonaws.com/supabase/edge-runtime:v20240715
```
