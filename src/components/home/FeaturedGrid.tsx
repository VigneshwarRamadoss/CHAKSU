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
          {!product.availableForSale && <span className={styles.statusBadge}>Sold Out</span>}
          {product.isNewRelease && product.availableForSale && <span className={styles.statusBadge}>New Release</span>}
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
  const featuredProducts = products.filter(product => product.isNewRelease).slice(0, 4);

  return (
    <section className={styles.gridSection}>
      <IntersectionReveal>
        <header className={styles.gridHeader}>
          <h2 className={styles.gridTitle}>Featured Drops</h2>
          <Link href="/collections/new-release" className={styles.headerLink}>View Release 001</Link>
        </header>
      </IntersectionReveal>
      
      <div className={styles.productGrid}>
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.gridFooter}>
        <Link href="/collections/all" className={styles.viewAllLink}>View All Products</Link>
      </div>
    </section>
  );
}
