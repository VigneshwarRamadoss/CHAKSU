import { ProductVariant, Money, Product } from "@/lib/data/fixtures";
import { shopifyFetch } from "@/lib/shopify/client";
import { getCartQuery } from "@/lib/shopify/queries";
import { createCartMutation, addToCartMutation, updateCartLinesMutation, removeFromCartMutation } from "@/lib/shopify/mutations";

/* ─── Cart Domain Types ─── */

export type CartLine = {
  id: string;
  variantId: string;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  price: Money;
  quantity: number;
  image?: string;
  imageAlt?: string;
};

export type Cart = {
  id: string;
  checkoutUrl?: string;
  lines: CartLine[];
  totalQuantity: number;
  subtotal: Money;
};

type ShopifyCartNode = {
  id: string;
  checkoutUrl?: string;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        cost: { totalAmount: { amount: string; currencyCode: string } };
        merchandise: {
          id: string;
          title: string;
          product: {
            handle: string;
            title: string;
            media: { edges: Array<{ node: { image?: { url: string; altText?: string | null } } }> };
          };
        };
      };
    }>;
  };
};
type ShopifyResponse<T> = { data: T };

const MAX_LINE_QUANTITY = 10;
const CART_STORAGE_KEY = "chaksu_cart_v1";

const isShopifyConfigured = 
  typeof process !== 'undefined' && 
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && 
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

/* ─── Pure Cart Operations (Fallback) ─── */

function emptyCart(): Cart {
  return {
    id: "dev-cart-" + Date.now(),
    lines: [],
    totalQuantity: 0,
    subtotal: { amount: 0, currencyCode: "INR" },
  };
}

function recalculate(cart: Cart): Cart {
  const totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotalAmount = cart.lines.reduce(
    (sum, line) => sum + line.price.amount * line.quantity,
    0
  );
  return {
    ...cart,
    totalQuantity,
    subtotal: { amount: subtotalAmount, currencyCode: "INR" },
  };
}

export function createCartLine(
  product: Product,
  variant: ProductVariant,
  quantity: number
): CartLine | null {
  if (!variant.availableForSale) return null;
  if (quantity < 1 || quantity > MAX_LINE_QUANTITY || !Number.isInteger(quantity)) return null;

  return {
    id: `line-${variant.id}`,
    variantId: variant.id, // For shopify, this needs to be a valid GraphQL ID (e.g. gid://shopify/ProductVariant/...)
    productHandle: product.handle,
    productTitle: product.title,
    variantTitle: `${variant.color} / ${variant.size}`,
    price: variant.price,
    quantity,
    image: product.media[0]?.url,
    imageAlt: product.media[0]?.altText,
  };
}

/* ─── Shopify Mapping ─── */
function shopifyToCart(node: ShopifyCartNode | null | undefined): Cart {
  if (!node) return emptyCart();
  
  const lines: CartLine[] = node.lines.edges.map((e) => {
    const item = e.node;
    const variant = item.merchandise;
    const product = variant.product;
    return {
      id: item.id,
      variantId: variant.id,
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: variant.title,
      price: {
        amount: parseFloat(item.cost.totalAmount.amount) / item.quantity,
        currencyCode: item.cost.totalAmount.currencyCode === "USD" ? "USD" : "INR"
      },
      quantity: item.quantity,
      image: product.media.edges[0]?.node.image?.url,
      imageAlt: product.media.edges[0]?.node.image?.altText ?? undefined,
    };
  });

  return {
    id: node.id,
    checkoutUrl: node.checkoutUrl,
    lines,
    totalQuantity: lines.reduce((acc: number, l: CartLine) => acc + l.quantity, 0),
    subtotal: {
      amount: parseFloat(node.cost.subtotalAmount.amount),
      currencyCode: node.cost.subtotalAmount.currencyCode === "USD" ? "USD" : "INR"
    }
  };
}

/* ─── Async Cart Operations ─── */

export async function addLine(cart: Cart, line: CartLine): Promise<Cart> {
  if (!isShopifyConfigured) {
    const existing = cart.lines.find(l => l.variantId === line.variantId);
    let updatedLines: CartLine[];

    if (existing) {
      const newQty = Math.min(existing.quantity + line.quantity, MAX_LINE_QUANTITY);
      updatedLines = cart.lines.map(l =>
        l.variantId === line.variantId ? { ...l, quantity: newQty } : l
      );
    } else {
      updatedLines = [...cart.lines, line];
    }
    return recalculate({ ...cart, lines: updatedLines });
  }

  try {
    const currentCartId = cart.id;
    if (cart.id.startsWith('dev-cart-')) {
      const { body } = await shopifyFetch<ShopifyResponse<{ cartCreate: { cart: ShopifyCartNode } }>>({
        query: createCartMutation,
        variables: { lineItems: [{ merchandiseId: line.variantId, quantity: line.quantity }] },
        cache: 'no-store'
      });
      return shopifyToCart(body.data.cartCreate.cart);
    } else {
      const { body } = await shopifyFetch<ShopifyResponse<{ cartLinesAdd: { cart: ShopifyCartNode } }>>({
        query: addToCartMutation,
        variables: { cartId: currentCartId, lines: [{ merchandiseId: line.variantId, quantity: line.quantity }] },
        cache: 'no-store'
      });
      return shopifyToCart(body.data.cartLinesAdd.cart);
    }
  } catch (err) {
    console.error(err);
    return cart; // Fallback or handle error
  }
}

export async function updateLineQuantity(cart: Cart, variantId: string, quantity: number): Promise<Cart> {
  if (!isShopifyConfigured) {
    if (quantity < 0 || quantity > MAX_LINE_QUANTITY || !Number.isInteger(quantity)) return cart;
    if (quantity === 0) return removeLine(cart, variantId);
    const updatedLines = cart.lines.map(l => l.variantId === variantId ? { ...l, quantity } : l);
    return recalculate({ ...cart, lines: updatedLines });
  }

  try {
    const line = cart.lines.find(l => l.variantId === variantId);
    if (!line) return cart;

    if (quantity === 0) return removeLine(cart, variantId);

    const { body } = await shopifyFetch<ShopifyResponse<{ cartLinesUpdate: { cart: ShopifyCartNode } }>>({
      query: updateCartLinesMutation,
      variables: { cartId: cart.id, lines: [{ id: line.id, quantity }] },
      cache: 'no-store'
    });
    return shopifyToCart(body.data.cartLinesUpdate.cart);
  } catch (err) {
    console.error(err);
    return cart;
  }
}

export async function removeLine(cart: Cart, variantId: string): Promise<Cart> {
  if (!isShopifyConfigured) {
    const updatedLines = cart.lines.filter(l => l.variantId !== variantId);
    return recalculate({ ...cart, lines: updatedLines });
  }

  try {
    const line = cart.lines.find(l => l.variantId === variantId);
    if (!line) return cart;

    const { body } = await shopifyFetch<ShopifyResponse<{ cartLinesRemove: { cart: ShopifyCartNode } }>>({
      query: removeFromCartMutation,
      variables: { cartId: cart.id, lineIds: [line.id] },
      cache: 'no-store'
    });
    return shopifyToCart(body.data.cartLinesRemove.cart);
  } catch (err) {
    console.error(err);
    return cart;
  }
}

export async function clearCart(): Promise<Cart> {
  return emptyCart();
}

/* ─── Persistence (localStorage) ─── */

export function saveCart(cart: Cart): void {
  if (typeof window === "undefined") return;
  try {
    if (isShopifyConfigured) {
      // Just save the cart ID for shopify
      localStorage.setItem(CART_STORAGE_KEY + "_id", cart.id);
    } else {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  } catch {
    // Quota exceeded or private browsing; silently fail
  }
}

export async function loadCart(): Promise<Cart> {
  if (typeof window === "undefined") return emptyCart();

  try {
    if (isShopifyConfigured) {
      const cartId = localStorage.getItem(CART_STORAGE_KEY + "_id");
      if (!cartId || cartId.startsWith('dev-cart-')) return emptyCart();
      
      const { body } = await shopifyFetch<ShopifyResponse<{ cart: ShopifyCartNode | null }>>({
        query: getCartQuery,
        variables: { cartId },
        cache: 'no-store'
      });

      if (!body.data.cart) {
        localStorage.removeItem(CART_STORAGE_KEY + "_id");
        return emptyCart();
      }

      return shopifyToCart(body.data.cart);
    } else {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return emptyCart();
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.lines) || typeof parsed.totalQuantity !== "number") {
        localStorage.removeItem(CART_STORAGE_KEY);
        return emptyCart();
      }
      const validLines = parsed.lines.filter(
        (l: Record<string, unknown>) =>
          typeof l.variantId === "string" && typeof l.productHandle === "string" &&
          typeof l.productTitle === "string" && typeof l.quantity === "number" &&
          l.quantity > 0 && l.quantity <= MAX_LINE_QUANTITY && l.price &&
          typeof (l.price as Money).amount === "number"
      ) as CartLine[];

      const recovered: Cart = {
        id: typeof parsed.id === "string" ? parsed.id : "dev-cart-recovered",
        lines: validLines,
        totalQuantity: 0,
        subtotal: { amount: 0, currencyCode: "INR" },
      };
      return recalculate(recovered);
    }
  } catch {
    if (!isShopifyConfigured) localStorage.removeItem(CART_STORAGE_KEY);
    return emptyCart();
  }
}

export { MAX_LINE_QUANTITY };
