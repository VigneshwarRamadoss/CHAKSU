"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductMedia } from "@/lib/data/fixtures";
import styles from "./PDP.module.css";

type MediaGalleryProps = {
  media: ProductMedia[];
  productTitle: string;
};

export function MediaGallery({ media, productTitle }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (media.length === 0) {
    return (
      <div className={styles.galleryCol}>
        <div className={styles.primaryImage}>
          <div className={styles.missingMedia}>No Image Available</div>
        </div>
      </div>
    );
  }

  const active = media[activeIndex] || media[0];

  return (
    <div className={styles.galleryCol}>
      <div className={styles.primaryImage}>
        <Image
          src={active.url}
          alt={active.altText || `${productTitle} image`}
          fill
          priority={activeIndex === 0}
          className={styles.primaryImg}
          sizes="(max-width: 900px) 100vw, 58vw"
        />
      </div>

      {media.length > 1 && (
        <div className={styles.thumbnailStrip} role="tablist" aria-label="Product images">
          {media.map((m, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={m.altText || `Image ${idx + 1}`}
              className={`${styles.thumbBtn} ${idx === activeIndex ? styles.thumbBtnActive : ""}`}
              onClick={() => setActiveIndex(idx)}
            >
              <Image
                src={m.url}
                alt=""
                fill
                className={styles.thumbImg}
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
