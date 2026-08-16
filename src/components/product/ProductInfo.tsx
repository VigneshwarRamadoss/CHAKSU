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
        "Orders ship from India with tracking once dispatched. Delivery speed and charges are calculated at checkout. Unworn items with original tags may be requested for return under the policy shown at checkout; final-sale items are excluded.",
    },
    {
      title: "Fabric & Care",
      content: `${product.subtitle ? `${product.subtitle}. ` : ""}Refer to the garment care label before washing. Store dry and avoid direct heat to preserve the fabric finish and hardware.`,
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
        product={product}
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
