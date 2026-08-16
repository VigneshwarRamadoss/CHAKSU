import Link from "next/link";
import { Product } from "@/lib/data/fixtures";
import { ProductCard } from "./ProductCard";
import styles from "./Shop.module.css";

type ProductGridProps = {
  products: Product[];
  totalCount: number;
  emptyTitle?: string;
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  totalCount,
  emptyTitle = "No Products Found",
  emptyMessage = "We couldn't find any products matching your selected criteria."
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState} role="status">
        <h3 className={styles.emptyTitle}>{emptyTitle}</h3>
        <p className={styles.emptyDesc}>{emptyMessage}</p>
        <Link href="/collections/all" className={styles.filterTriggerBtn}>
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <section aria-label="Product Catalog">
      {/* Live Region for Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {products.length} of {totalCount} products.
      </div>

      <div className={styles.productGrid}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} eager={index === 0} />
        ))}
      </div>
    </section>
  );
}
