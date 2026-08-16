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
      // Show sticky bar when main buy button sentinel is scrolled past
      setIsVisible(!entry.isIntersecting);
    }, { threshold: 0 });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelRef]);

  if (!isVisible) return null;

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
        disabled={isSoldOut}
        aria-label={`Add ${product.title} to Bag`}
      >
        {isSoldOut ? "Sold Out" : "Add to Bag"}
      </button>
    </div>
  );
}
