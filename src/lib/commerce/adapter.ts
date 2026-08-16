import { Product, ProductVariant, Collection, MOCK_PRODUCTS, MOCK_COLLECTIONS } from "@/lib/data/fixtures";
import { shopifyFetch } from "@/lib/shopify/client";
import { getProductQuery, getProductsQuery, getCollectionQuery, getCollectionsQuery } from "@/lib/shopify/queries";
export { MAX_LINE_QUANTITY } from "@/lib/commerce/cart";

export type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

export type ProductQueryParams = {
  collection?: string;
  query?: string;
  sort?: SortOption;
  category?: string | string[];
  color?: string | string[];
  size?: string | string[];
  availableOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
};

export type FilterOption = {
  label: string;
  value: string;
  count: number;
};

export type FilterMetadata = {
  categories: FilterOption[];
  colors: FilterOption[];
  sizes: FilterOption[];
  priceRange: {
    min: number;
    max: number;
  };
};

export type ProductQueryResult = {
  products: Product[];
  totalCount: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
  availableFilters: FilterMetadata;
};

type ShopifyMoney = { amount: string | number; currencyCode: string };
type ShopifyEdge<T> = { node: T };
type ShopifySelectedOption = { name: string; value: string };
type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags?: string[];
  availableForSale: boolean;
  priceRange: { minVariantPrice: ShopifyMoney; maxVariantPrice: ShopifyMoney };
  media: {
    edges: ShopifyEdge<{
      mediaContentType?: string;
      image?: { url: string; altText?: string | null; width?: number | null; height?: number | null };
    }>[];
  };
  variants: {
    edges: ShopifyEdge<{
      id: string;
      sku?: string | null;
      availableForSale: boolean;
      price: ShopifyMoney;
      selectedOptions: ShopifySelectedOption[];
    }>[];
  };
};
type ShopifyCollectionNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: { url: string } | null;
};
type ShopifyResponse<T> = { data: T };

function toMoney(money: ShopifyMoney): ProductVariant["price"] {
  return {
    amount: Number(money.amount),
    currencyCode: money.currencyCode === "USD" ? "USD" : "INR",
  };
}

function toCategory(tag?: string): Product["category"] {
  const category = tag?.replace("category:", "");
  return category === "outerwear" || category === "utility" || category === "essentials"
    ? category
    : "k-line";
}

export function formatINRPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

const isShopifyConfigured = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

function shopifyToProduct(node: ShopifyProductNode): Product {
  const categoryTag = node.tags?.find((t: string) => t.startsWith("category:"));
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    category: toCategory(categoryTag),
    isNewRelease: node.tags?.includes("new-release") || false,
    availableForSale: node.availableForSale,
    priceRange: {
      minVariantPrice: toMoney(node.priceRange.minVariantPrice),
      maxVariantPrice: toMoney(node.priceRange.maxVariantPrice),
    },
    media: node.media.edges.map((e) => ({
      url: e.node.image?.url || "",
      altText: e.node.image?.altText || node.title,
      width: e.node.image?.width || 0,
      height: e.node.image?.height || 0,
      type: e.node.mediaContentType === "VIDEO" ? "video" : "image"
    })),
    variants: node.variants.edges.map((e) => {
      const colorOpt = e.node.selectedOptions.find((o) => o.name === "Color");
      const sizeOpt = e.node.selectedOptions.find((o) => o.name === "Size");
      return {
        id: e.node.id,
        sku: e.node.sku || "",
        color: colorOpt ? colorOpt.value : "",
        size: sizeOpt ? sizeOpt.value : "",
        availableForSale: e.node.availableForSale,
        price: toMoney(e.node.price),
      }
    }),
  }
}

/**
 * Commerce Adapter implementation.
 * Gracefully degrades to mock fixtures if Shopify env vars are not set.
 */
export async function getCollection(handle: string): Promise<Collection | null> {
  if (!isShopifyConfigured) {
    const collection = MOCK_COLLECTIONS.find(c => c.handle === handle);
    return collection || null;
  }
  
  try {
    const { body } = await shopifyFetch<ShopifyResponse<{ collection: ShopifyCollectionNode | null }>>({
      query: getCollectionQuery,
      variables: { handle },
      tags: ['collections']
    });
    
    if (!body.data?.collection) return null;
    return {
      id: body.data.collection.id,
      handle: body.data.collection.handle,
      title: body.data.collection.title,
      description: body.data.collection.description,
      image: body.data.collection.image?.url
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllCollections(): Promise<Collection[]> {
  if (!isShopifyConfigured) return MOCK_COLLECTIONS;
  
  try {
    const { body } = await shopifyFetch<ShopifyResponse<{ collections: { edges: ShopifyEdge<ShopifyCollectionNode>[] } }>>({
      query: getCollectionsQuery,
      variables: { first: 20 },
      tags: ['collections']
    });
    
    return body.data.collections.edges.map((e) => ({
      id: e.node.id,
      handle: e.node.handle,
      title: e.node.title,
      description: e.node.description,
      image: e.node.image?.url
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProducts(params: ProductQueryParams = {}): Promise<ProductQueryResult> {
  if (!isShopifyConfigured) {
    let filtered = [...MOCK_PRODUCTS];

    if (params.collection && params.collection !== "all") {
      if (params.collection === "new-release") {
        filtered = filtered.filter(p => p.isNewRelease);
      } else {
        filtered = filtered.filter(p => p.category === params.collection);
      }
    }

    if (params.query && params.query.trim() !== "") {
      const q = params.query.trim().toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Facet counts must describe the current collection/search universe, not
    // the entire fixture catalogue. Capture that base before applying facets.
    const facetUniverse = [...filtered];

    if (params.category) {
      const cats = Array.isArray(params.category) ? params.category : [params.category];
      if (cats.length > 0) {
        filtered = filtered.filter(p => cats.includes(p.category));
      }
    }

    if (params.color) {
      const colors = Array.isArray(params.color) ? params.color : [params.color];
      if (colors.length > 0) {
        filtered = filtered.filter(p => 
          p.variants.some(v => colors.some(c => v.color.toLowerCase() === c.toLowerCase()))
        );
      }
    }

    if (params.size) {
      const sizes = Array.isArray(params.size) ? params.size : [params.size];
      if (sizes.length > 0) {
        filtered = filtered.filter(p => 
          p.variants.some(v => sizes.some(s => v.size.toLowerCase() === s.toLowerCase()))
        );
      }
    }

    if (params.availableOnly) {
      filtered = filtered.filter(p => p.availableForSale);
    }

    if (params.minPrice !== undefined && !isNaN(params.minPrice)) {
      filtered = filtered.filter(p => p.priceRange.minVariantPrice.amount >= params.minPrice!);
    }
    if (params.maxPrice !== undefined && !isNaN(params.maxPrice)) {
      filtered = filtered.filter(p => p.priceRange.minVariantPrice.amount <= params.maxPrice!);
    }

    const sort = params.sort || "featured";
    switch (sort) {
      case "newest":
        filtered.sort((a, b) => (b.isNewRelease ? 1 : 0) - (a.isNewRelease ? 1 : 0));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.priceRange.minVariantPrice.amount - b.priceRange.minVariantPrice.amount);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.priceRange.minVariantPrice.amount - a.priceRange.minVariantPrice.amount);
        break;
      case "featured":
      default:
        break;
    }

    const allCategories = Array.from(new Set(facetUniverse.map(p => p.category)));
    const allColors = Array.from(new Set(facetUniverse.flatMap(p => p.variants.map(v => v.color))));
    const allSizes = Array.from(new Set(facetUniverse.flatMap(p => p.variants.map(v => v.size))));
    
    const prices = facetUniverse.map(p => p.priceRange.minVariantPrice.amount);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    const availableFilters: FilterMetadata = {
      categories: allCategories.map(c => ({
        label: c.toUpperCase().replace("-", " "),
        value: c,
        count: facetUniverse.filter(p => p.category === c).length
      })),
      colors: allColors.map(c => ({
        label: c,
        value: c.toLowerCase(),
        count: facetUniverse.filter(p => p.variants.some(v => v.color.toLowerCase() === c.toLowerCase())).length
      })),
      sizes: allSizes.map(s => ({
        label: s,
        value: s.toLowerCase(),
        count: facetUniverse.filter(p => p.variants.some(v => v.size.toLowerCase() === s.toLowerCase())).length
      })),
      priceRange: { min: minPrice, max: maxPrice }
    };

    const pageSize = params.pageSize || 12;
    const page = Math.max(1, params.page || 1);
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;
    
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = filtered.slice(startIndex, startIndex + pageSize);

    return {
      products: paginatedProducts,
      totalCount,
      page,
      totalPages,
      hasMore: page < totalPages,
      availableFilters
    };
  }

  // Shopify logic
  let sortKey = 'RELEVANCE';
  let reverse = false;
  
  if (params.sort) {
    switch (params.sort) {
      case "newest":
        sortKey = 'CREATED_AT';
        reverse = true;
        break;
      case "price-asc":
        sortKey = 'PRICE';
        reverse = false;
        break;
      case "price-desc":
        sortKey = 'PRICE';
        reverse = true;
        break;
    }
  }
  
  const queryParts: string[] = [];
  if (params.query) queryParts.push(`title:*${params.query}*`);
  // Simplified query mapping for mock to real
  
  const shopifyQuery = queryParts.length > 0 ? queryParts.join(' AND ') : undefined;
  
  try {
    const { body } = await shopifyFetch<ShopifyResponse<{ products: { edges: ShopifyEdge<ShopifyProductNode>[]; pageInfo: { hasNextPage: boolean } } }>>({
      query: getProductsQuery,
      variables: { first: params.pageSize || 12, query: shopifyQuery, sortKey, reverse },
      tags: ['products']
    });
    
    const products = body.data.products.edges.map((e) => shopifyToProduct(e.node));
    
    return {
      products,
      totalCount: products.length, // Simplified
      page: 1,
      totalPages: 1,
      hasMore: body.data.products.pageInfo.hasNextPage,
      availableFilters: {
        categories: [],
        colors: [],
        sizes: [],
        priceRange: { min: 0, max: 0 }
      }
    };
  } catch (error) {
    console.error(error);
    return {
      products: [],
      totalCount: 0,
      page: 1,
      totalPages: 1,
      hasMore: false,
      availableFilters: { categories: [], colors: [], sizes: [], priceRange: { min: 0, max: 0 } }
    };
  }
}

export async function searchProducts(query: string, params: ProductQueryParams = {}): Promise<ProductQueryResult> {
  return getProducts({ ...params, query });
}

export type ProductOption = {
  name: string;
  values: string[];
};

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) {
    const product = MOCK_PRODUCTS.find(p => p.handle === handle);
    return product || null;
  }
  
  try {
    const { body } = await shopifyFetch<ShopifyResponse<{ product: ShopifyProductNode | null }>>({
      query: getProductQuery,
      variables: { handle },
      tags: ['products']
    });
    
    if (!body.data?.product) return null;
    return shopifyToProduct(body.data.product);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getProductOptions(product: Product): ProductOption[] {
  const colorSet = new Set<string>();
  const sizeSet = new Set<string>();

  for (const v of product.variants) {
    if (v.color) colorSet.add(v.color);
    if (v.size) sizeSet.add(v.size);
  }

  const options: ProductOption[] = [];
  if (colorSet.size > 0) options.push({ name: "Color", values: Array.from(colorSet) });
  if (sizeSet.size > 0) options.push({ name: "Size", values: Array.from(sizeSet) });
  return options;
}

export function resolveVariant(
  product: Product,
  selectedOptions: Record<string, string>
): ProductVariant | null {
  return product.variants.find(v => {
    const colorMatch = !selectedOptions.Color || v.color === selectedOptions.Color;
    const sizeMatch = !selectedOptions.Size || v.size === selectedOptions.Size;
    return colorMatch && sizeMatch;
  }) || null;
}

export function isOptionAvailable(
  product: Product,
  optionName: string,
  optionValue: string,
  currentSelections: Record<string, string>
): boolean {
  return product.variants.some(v => {
    if (optionName === "Color") {
      const sizeMatch = !currentSelections.Size || v.size === currentSelections.Size;
      return v.color === optionValue && v.availableForSale && sizeMatch;
    }
    if (optionName === "Size") {
      const colorMatch = !currentSelections.Color || v.color === currentSelections.Color;
      return v.size === optionValue && v.availableForSale && colorMatch;
    }
    return false;
  });
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  if (!isShopifyConfigured) {
    return MOCK_PRODUCTS.filter(
      p => p.id !== product.id && p.category === product.category && p.availableForSale
    ).slice(0, 4);
  }
  
  // Real implementation could query recommendations
  const res = await getProducts({ category: product.category, pageSize: 5 });
  return res.products.filter(p => p.id !== product.id).slice(0, 4);
}
