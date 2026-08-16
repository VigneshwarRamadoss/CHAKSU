import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data/fixtures";
import { formatINRPrice } from "@/lib/commerce/adapter";
import { ParallaxLayer } from "../motion/ParallaxLayer";
import { IntersectionReveal } from "../motion/IntersectionReveal";
import styles from "./FeaturedGrid.module.css";

export function ProductCard({ product }: { product: Product }) {
  const primaryMedia = product.media[0];
  const secondaryMedia = product.media[1];

  return (
    <div className={styles.productCard}>
      <Link href={`/products/${product.handle}`} className={styles.productLink}>
        <div className={styles.mediaContainer}>
          {primaryMedia.isEditorial ? (
            <ParallaxLayer 
              amplitude={24} 
              depth={1} 
              frameClassName={styles.mediaFrame} 
              layerClassName={styles.mediaLayer}
            >
              <Image
                src={primaryMedia.url}
                alt={primaryMedia.altText}
                fill
                className={styles.productImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </ParallaxLayer>
          ) : (
            <div className={styles.mediaFrame}>
              <Image
                src={primaryMedia.url}
                alt={primaryMedia.altText}
                fill
                className={styles.productImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          
          {secondaryMedia && (
            <div className={styles.secondaryMediaHover}>
              <Image
                src={secondaryMedia.url}
                alt={secondaryMedia.altText}
                fill
                className={styles.productImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
        <div className={styles.productInfo}>
          <h3 className={styles.productTitle}>{product.title}</h3>
          <span className={styles.productPrice}>
            {formatINRPrice(product.priceRange.minVariantPrice.amount)}
          </span>
        </div>
      </Link>
    </div>
  );
}

export function FeaturedGrid({ products }: { products: Product[] }) {
  return (
    <section className={styles.gridSection}>
      <IntersectionReveal>
        <header className={styles.gridHeader}>
          <h2 className={styles.gridTitle}>Featured Drops</h2>
        </header>
      </IntersectionReveal>
      
      <div className={styles.productGrid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
