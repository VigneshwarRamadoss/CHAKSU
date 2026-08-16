import type { Metadata } from "next";
import { getAllCollections, getCollection, getProducts, type SortOption } from "@/lib/commerce/adapter";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { FilterBar } from "@/components/shop/FilterBar";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import styles from "@/components/shop/Shop.module.css";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Shop All — CHAKSU",
  description: "Explore the complete CHAKSU garment archive.",
};

export default async function ShopAll({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const requestedSort = typeof resolved.sort === "string" ? resolved.sort : "featured";
  const sort: SortOption = ["featured", "newest", "price-asc", "price-desc"].includes(requestedSort)
    ? requestedSort as SortOption
    : "featured";
  const requestedPage = typeof resolved.page === "string" ? Number.parseInt(resolved.page, 10) : 1;
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const [resolvedCollection, allCollections, queryResult] = await Promise.all([
    getCollection("all"),
    getAllCollections(),
    getProducts({
      collection: "all",
      sort,
      category: resolved.category,
      color: resolved.color,
      size: resolved.size,
      availableOnly: resolved.available === "true",
      page,
      pageSize: 12,
    }),
  ]);

  const collection = resolvedCollection || {
    id: "col_all",
    handle: "all",
    title: "All Products",
    description: "The complete CHAKSU archive. Built in movement, engineered with controlled aggression.",
  };
  const collectionNavigation = allCollections.some(item => item.handle === "all")
    ? allCollections
    : [collection, ...allCollections];

  return (
    <div className={styles.shopPage}>
      <div className={styles.container}>
        <CollectionHeader collection={collection} allCollections={collectionNavigation} />
        <FilterBar totalCount={queryResult.totalCount} filterMetadata={queryResult.availableFilters} />
        <div className={styles.shopContentLayout}>
          <FilterSidebar filterMetadata={queryResult.availableFilters} />
          <div className={styles.gridCol}>
            <ProductGrid products={queryResult.products} totalCount={queryResult.totalCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
