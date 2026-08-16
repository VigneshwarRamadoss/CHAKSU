"use client";

import { useEffect, useState, RefObject } from "react";
import { Product, ProductVariant } from "@/lib/data/fixtures";
import { formatINRPrice } from "@/lib/commerce/adapter";
import styles from "./PDP.module.css";

type StickyMobileBuyBarProps = {
  product: Product;
  resolvedVariant: ProductVariant | null;
  currentPrice: number;
  isSoldOut: boolean;
  onAddToCart: () => void;
  sentinelRef: RefObject<HTMLDivElement | null>;
};

export function StickyMobileBuyBar({
  product,
  resolvedVariant,
  currentPrice,
  isSoldOut,
  onAddToCart,
  sentinelRef,
}: StickyMobileBuyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      // A non-intersecting sentinel can be either above or below the viewport.
      // Only reveal the shortcut after the main purchase controls were passed.
      setIsVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    }, { threshold: 0 });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelRef]);

  if (!isVisible) return null;

  const canAddToCart = resolvedVariant?.availableForSale === true && !isSoldOut;

  return (
    <div className={styles.stickyMobileBar} role="region" aria-label="Quick Add to Bag">
      <div className={styles.stickyMobileInfo}>
        <span className={styles.stickyMobileTitle}>{product.title}</span>
        <span className={styles.stickyMobilePrice}>{formatINRPrice(currentPrice)}</span>
      </div>
      <button
        type="button"
        className={styles.stickyMobileBtn}
        onClick={onAddToCart}
        disabled={!canAddToCart}
        aria-label={canAddToCart ? `Add ${product.title} to Bag` : `Select product options for ${product.title}`}
      >
        {isSoldOut ? "Sold Out" : canAddToCart ? "Add to Bag" : "Select Options"}
      </button>
    </div>
  );
}
