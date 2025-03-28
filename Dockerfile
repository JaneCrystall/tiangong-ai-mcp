FROM denoland/deno:debian

WORKDIR /app

COPY ./supabase/functions/_shared /app/_shared
COPY ./supabase/functions/main /app/main
COPY ./supabase/functions/import_map.json /app/import_map.json

COPY .env /app/.env

CMD ["deno run --allow-all --env --import-map import_map.json ./main/index.ts"]