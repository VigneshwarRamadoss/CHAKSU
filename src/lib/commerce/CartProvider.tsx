"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  Cart,
  CartLine,
  addLine,
  updateLineQuantity,
  removeLine,
  clearCart as clearCartOp,
  saveCart,
  loadCart,
} from "@/lib/commerce/cart";

type CartContextType = {
  cart: Cart;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (line: CartLine) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (variantId: string) => Promise<void>;
  clearAll: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    id: "loading",
    lines: [],
    totalQuantity: 0,
    subtotal: { amount: 0, currencyCode: "INR" },
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage after hydration
  useEffect(() => {
    let mounted = true;
    setTimeout(async () => {
      const loaded = await loadCart();
      if (mounted) {
        setCart(loaded);
        setHydrated(true);
      }
    }, 0);
    return () => { mounted = false; };
  }, []);

  // Persist whenever cart changes (but not on initial hydration load)
  useEffect(() => {
    if (hydrated) {
      saveCart(cart);
    }
  }, [cart, hydrated]);

  const addToCart = useCallback(async (line: CartLine) => {
    const updated = await addLine(cart, line);
    setCart(updated);
    setIsDrawerOpen(true);
  }, [cart]);

  const updateQuantity = useCallback(async (variantId: string, quantity: number) => {
    const updated = await updateLineQuantity(cart, variantId, quantity);
    setCart(updated);
  }, [cart]);

  const removeFromCart = useCallback(async (variantId: string) => {
    const updated = await removeLine(cart, variantId);
    setCart(updated);
  }, [cart]);

  const clearAll = useCallback(async () => {
    const cleared = await clearCartOp();
    setCart(cleared);
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
