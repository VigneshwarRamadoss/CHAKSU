"use client";

import { useState, useRef } from "react";
import { Product, ProductVariant } from "@/lib/data/fixtures";
import {
  formatINRPrice,
  getProductOptions,
  resolveVariant,
  isOptionAvailable,
  MAX_LINE_QUANTITY,
} from "@/lib/commerce/adapter";
import { createCartLine } from "@/lib/commerce/cart";
import { useCart } from "@/lib/commerce/CartProvider";
import { StickyMobileBuyBar } from "./StickyMobileBuyBar";
import styles from "./PDP.module.css";

type VariantSelectorProps = {
  product: Product;
  onSizeGuideOpen: () => void;
};

export function VariantSelector({ product, onSizeGuideOpen }: VariantSelectorProps) {
  const { addToCart } = useCart();
  const options = getProductOptions(product);

  // Determine default selections: if only one value for an option, auto-select it
  const initialSelections: Record<string, string> = {};
  for (const opt of options) {
    if (opt.values.length === 1) {
      initialSelections[opt.name] = opt.values[0];
    }
  }

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialSelections);
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const optionRefs = useRef<Record<string, HTMLFieldSetElement | null>>({});
  const buyButtonSentinelRef = useRef<HTMLDivElement>(null);

  const resolvedVariant: ProductVariant | null = resolveVariant(product, selectedOptions);

  const currentPrice = resolvedVariant?.price.amount ?? product.priceRange.minVariantPrice.amount;
  const compareAtPrice = resolvedVariant?.compareAtPrice?.amount;
  const hasValidCompareAt = compareAtPrice !== undefined && compareAtPrice > currentPrice;

  const isSoldOut = !product.availableForSale || (resolvedVariant !== null && !resolvedVariant.availableForSale);
  const allOptionsSelected = options.every(opt => !!selectedOptions[opt.name]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[optionName];
      return next;
    });
  };

  const handleAddToCart = () => {
    // Validate all options are selected
    const newErrors: Record<string, string> = {};
    for (const opt of options) {
      if (!selectedOptions[opt.name]) {
        newErrors[opt.name] = `Please select a ${opt.name.toLowerCase()}`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus the first invalid option group
      const firstError = options.find(opt => newErrors[opt.name]);
      if (firstError && optionRefs.current[firstError.name]) {
        optionRefs.current[firstError.name]?.focus();
      }
      return;
    }

    if (!resolvedVariant || !resolvedVariant.availableForSale) return;

    setIsSubmitting(true);
    const line = createCartLine(product, resolvedVariant, quantity);
    if (line) {
      addToCart(line);
    }
    setTimeout(() => setIsSubmitting(false), 300);
  };

  return (
    <>
      {/* Price */}
      <div className={styles.priceRow}>
        <span className={styles.price}>{formatINRPrice(currentPrice)}</span>
        {hasValidCompareAt && (
          <span className={styles.comparePrice}>{formatINRPrice(compareAtPrice)}</span>
        )}
      </div>

      {/* Sold Out */}
      {isSoldOut && allOptionsSelected && (
        <span className={styles.soldOutLabel} role="status">Sold Out</span>
      )}

      {/* Option groups */}
      {options.map(opt => {
        const hasError = !!errors[opt.name];
        return (
          <fieldset
            key={opt.name}
            className={`${styles.optionGroup} ${hasError ? styles.optionGroupError : ""}`}
            ref={el => { optionRefs.current[opt.name] = el; }}
            tabIndex={-1}
          >
            <legend className={styles.optionLabel}>
              {opt.name}
              {selectedOptions[opt.name] && `: ${selectedOptions[opt.name]}`}
            </legend>
            <div className={styles.optionValues} role="radiogroup" aria-label={`Select ${opt.name}`}>
              {opt.values.map(val => {
                const isSelected = selectedOptions[opt.name] === val;
                const available = isOptionAvailable(product, opt.name, val, selectedOptions);

                return (
                  <button
                    key={val}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`${opt.name}: ${val}${!available ? " (unavailable)" : ""}`}
                    disabled={!available}
                    className={`${styles.optionBtn} ${isSelected ? styles.optionBtnSelected : ""} ${!available ? styles.optionBtnUnavailable : ""}`}
                    onClick={() => handleOptionChange(opt.name, val)}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            {errors[opt.name] && (
              <p className={styles.optionError} role="alert">{errors[opt.name]}</p>
            )}
          </fieldset>
        );
      })}

      {/* Size Guide Link */}
      {options.some(o => o.name === "Size") && (
        <button type="button" className={styles.sizeGuideBtn} onClick={onSizeGuideOpen}>
          Size Guide
        </button>
      )}

      {/* Quantity */}
      <div className={styles.quantityRow}>
        <span className={styles.quantityLabel}>Quantity</span>
        <div className={styles.quantityControls}>
          <button
            type="button"
            className={styles.qtyBtn}
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className={styles.qtyValue} aria-label={`Quantity: ${quantity}`}>
            {quantity}
          </span>
          <button
            type="button"
            className={styles.qtyBtn}
            onClick={() => setQuantity(q => Math.min(MAX_LINE_QUANTITY, q + 1))}
            aria-label="Increase quantity"
            disabled={quantity >= MAX_LINE_QUANTITY}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        type="button"
        className={styles.addToCartBtn}
        onClick={handleAddToCart}
        disabled={isSubmitting || isSoldOut}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Adding…" : isSoldOut ? "Sold Out" : "Add to Bag"}
      </button>

      {/* Sentinel to observe when main buy button scrolls past */}
      <div ref={buyButtonSentinelRef} className={styles.buySentinel} aria-hidden="true" />

      {/* Sticky Mobile Add to Bag Bar (< 768px) */}
      <StickyMobileBuyBar
        product={product}
        resolvedVariant={resolvedVariant}
        currentPrice={currentPrice}
        isSoldOut={isSoldOut}
        onAddToCart={handleAddToCart}
        sentinelRef={buyButtonSentinelRef}
      />

      {/* Live confirmation */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isSubmitting ? `Adding ${product.title} to bag` : ""}
      </div>
    </>
  );
}
