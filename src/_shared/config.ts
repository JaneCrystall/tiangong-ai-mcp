export const supabase_base_url =
  process.env.SUPABASE_BASE_URL ?? 'https://qyyqlnwqwgvzxnccnbgm.supabase.co';
export const supabase_publishable_key =
  process.env.SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_4NJznLyr-65NkKeknxZ1PQ_Hy-3L9FR';
export const x_region = process.env.X_REGION ?? 'us-east-1';

export const redis_url = process.env.UPSTASH_REDIS_URL ?? '';
export const redis_token = process.env.UPSTASH_REDIS_TOKEN ?? '';

export const local_deployment_url = process.env.LOCAL_DEPLOYMENT_URL ?? '';
export const remote_deployment_url = process.env.REMOTE_DEPLOYMENT_URL ?? '';
export const local_langsmith_api_key = process.env.LOCAL_LANGSMITH_API_KEY ?? '';
export const remote_langsmith_api_key = process.env.REMOTE_LANGSMITH_API_KEY ?? '';
