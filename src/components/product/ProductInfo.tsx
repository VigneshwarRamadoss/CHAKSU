"use client";

import { useState } from "react";
import { Product } from "@/lib/data/fixtures";
import { MediaGallery } from "./MediaGallery";
import { VariantSelector } from "./VariantSelector";
import { SizeGuideDialog } from "./SizeGuideDialog";
import { ProductAccordion } from "./ProductAccordion";
import styles from "./PDP.module.css";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const accordionItems = [
    {
      title: "Description",
      content: product.description,
    },
    {
      title: "Shipping & Returns",
      content:
        "Development placeholder — shipping and returns information will be sourced from the commerce adapter in Phase 5.",
    },
  ];

  return (
    <div className={styles.pdpGrid}>
      <MediaGallery media={product.media} productTitle={product.title} />

      <div className={styles.infoCol}>
        <div>
          <h1 className={styles.productTitle}>{product.title}</h1>
          {product.subtitle && (
            <p className={styles.productSubtitle}>{product.subtitle}</p>
          )}
        </div>

        <VariantSelector
          product={product}
          onSizeGuideOpen={() => setIsSizeGuideOpen(true)}
        />

        <ProductAccordion items={accordionItems} />
      </div>

      <SizeGuideDialog
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
