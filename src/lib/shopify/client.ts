type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags
}: ShopifyFetchParams): Promise<{ status: number; body: T } | never> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  if (!domain || !token) {
    throw new Error('Shopify credentials are not set in environment variables.');
  }

  const endpoint = `https://${domain}/api/2026-04/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw error;
  }
}
