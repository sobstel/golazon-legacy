export const DEFAULT_CACHE_TIME = 15;

// Cache is revalidated on redeploy by vercel
// Max one year: https://vercel.com/docs/edge-network/caching#limits
export const MAX_CACHE_TIME = 60 * 60 * 24 * 365;
