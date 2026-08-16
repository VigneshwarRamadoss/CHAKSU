import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data/fixtures";
import { formatINRPrice } from "@/lib/commerce/adapter";
import styles from "./Shop.module.css";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const primaryMedia = product.media && product.media.length > 0 ? product.media[0] : null;
  const secondaryMedia = product.media && product.media.length > 1 ? product.media[1] : null;

  const fallbackImage = "/images/Visual Background UI Image.png";
  const primaryUrl = primaryMedia?.url || fallbackImage;
  const secondaryUrl = secondaryMedia?.url;
  const altText = primaryMedia?.altText || product.title;

  const minPrice = product.priceRange.minVariantPrice.amount;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount;
  const hasValidCompareAt = compareAtPrice !== undefined && compareAtPrice > minPrice;

  return (
    <article className={styles.card}>
      <Link 
        href={`/products/${product.handle}`} 
        className={styles.cardLink}
        aria-label={`${product.title} - ${formatINRPrice(minPrice)}${!product.availableForSale ? " (Sold Out)" : ""}`}
      >
        <div className={styles.mediaWrapper}>
          {!product.availableForSale && (
            <span className={styles.soldOutBadge} aria-label="Product is sold out">
              Sold Out
            </span>
          )}
          
          {product.availableForSale && hasValidCompareAt && (
            <span className={styles.saleBadge} aria-label="Product is on sale">
              Sale
            </span>
          )}

          <Image
            src={primaryUrl}
            alt={altText}
            fill
            loading={eager ? "eager" : "lazy"}
            className={styles.productImg}
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />

          {secondaryUrl && (
            <Image
              src={secondaryUrl}
              alt={`${product.title} alternate view`}
              fill
              className={styles.productImg}
              style={{ opacity: 0, transition: 'opacity 0.2s ease' }}
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          )}
        </div>

        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{product.title}</h3>
          {product.subtitle && (
            <p className={styles.cardSubtitle}>{product.subtitle}</p>
          )}
          
          <div className={styles.priceRow}>
            <span>{formatINRPrice(minPrice)}</span>
            {hasValidCompareAt && (
              <span className={styles.comparePrice}>
                {formatINRPrice(compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
