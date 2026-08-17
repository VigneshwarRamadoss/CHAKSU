import { Metadata } from "next";
import Link from "next/link";
import { searchProducts, SortOption } from "@/lib/commerce/adapter";
import { SearchForm } from "@/components/shop/SearchForm";
import { FilterBar } from "@/components/shop/FilterBar";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import styles from "@/components/shop/Shop.module.css";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q.trim() : "";
  const title = q ? `Search results for "${q}" — CHAKSU` : "Search — CHAKSU";

  return {
    title,
    description: "Search the CHAKSU product archive.",
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  
  const rawQuery = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
  const query = rawQuery.trim();

  const sortParam = (typeof resolvedSearchParams.sort === "string" ? resolvedSearchParams.sort : "featured") as SortOption;
  const sort: SortOption = ["featured", "newest", "price-asc", "price-desc"].includes(sortParam) ? sortParam : "featured";

  const category = resolvedSearchParams.category;
  const color = resolvedSearchParams.color;
  const size = resolvedSearchParams.size;
  const availableOnly = resolvedSearchParams.available === "true";
  
  const pageStr = typeof resolvedSearchParams.page === "string" ? resolvedSearchParams.page : "1";
  const page = parseInt(pageStr, 10) || 1;

  const queryResult = query ? await searchProducts(query, {
    sort,
    category,
    color,
    size,
    availableOnly,
    page,
    pageSize: 12
  }) : null;

  return (
    <div className={styles.shopPage}>
      <div className={styles.container}>
        <header className={styles.collectionHeader}>
          <div className={styles.searchIntro}>
            <p className={styles.searchEyebrow}>Archive / Product Index</p>
            <h1 className={styles.searchPageTitle}>Find your<br /><span>system.</span></h1>
            <p className={styles.searchPageDesc}>Search by silhouette, material, climate, or product name.</p>
          </div>
          <SearchForm initialQuery={query} />
          {query && (
            <h2 className={styles.searchQueryHeading}>
              Results for &ldquo;{query}&rdquo;
            </h2>
          )}
        </header>

        {!query && (
          <div className={styles.emptyState}>
            <p className={styles.searchSuggestionTitle}>Suggested coordinates</p>
            <p className={styles.emptyDesc}>
              Start with a construction, climate, or silhouette.
            </p>
            <nav className={styles.popularSearches} aria-label="Suggested searches">
              <Link href="/search?q=cargo">Cargo <span>↗</span></Link>
              <Link href="/search?q=monsoon">Monsoon <span>↗</span></Link>
              <Link href="/search?q=technical">Technical <span>↗</span></Link>
              <Link href="/search?q=tee">Heavyweight Tee <span>↗</span></Link>
            </nav>
          </div>
        )}

        {query && queryResult && (
          <>
            <FilterBar 
              totalCount={queryResult.totalCount} 
              filterMetadata={queryResult.availableFilters} 
            />

            <div className={styles.shopContentLayout}>
              <FilterSidebar filterMetadata={queryResult.availableFilters} />

              <div className={styles.gridCol}>
                <ProductGrid 
                  products={queryResult.products} 
                  totalCount={queryResult.totalCount} 
                  emptyTitle={`No Results for "${query}"`}
                  emptyMessage="Try checking your spelling, removing filter criteria, or searching for broader terms like 'cargo', 'tee', or 'jacket'."
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
