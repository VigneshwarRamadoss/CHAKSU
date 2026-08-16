import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection, getAllCollections, getProducts, SortOption } from "@/lib/commerce/adapter";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { FilterBar } from "@/components/shop/FilterBar";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import styles from "@/components/shop/Shop.module.css";

type PageProps = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  const title = collection ? `${collection.title} — CHAKSU` : "Shop — CHAKSU";
  const description = collection?.description || "Browse CHAKSU engineered garments.";
  
  return {
    title,
    description,
  };
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { handle } = await params;
  const resolvedSearchParams = await searchParams;

  // Normalize URL parameters safely
  const sortParam = (typeof resolvedSearchParams.sort === "string" ? resolvedSearchParams.sort : "featured") as SortOption;
  const sort: SortOption = ["featured", "newest", "price-asc", "price-desc"].includes(sortParam) ? sortParam : "featured";

  const category = resolvedSearchParams.category;
  const color = resolvedSearchParams.color;
  const size = resolvedSearchParams.size;
  const availableOnly = resolvedSearchParams.available === "true";
  
  const pageStr = typeof resolvedSearchParams.page === "string" ? resolvedSearchParams.page : "1";
  const page = parseInt(pageStr, 10) || 1;

  const collection = await getCollection(handle);
  if (!collection) notFound();

  const allCollections = await getAllCollections();

  const queryResult = await getProducts({
    collection: handle,
    sort,
    category,
    color,
    size,
    availableOnly,
    page,
    pageSize: 12
  });

  return (
    <div className={styles.shopPage}>
      <div className={styles.container}>
        <CollectionHeader collection={collection} allCollections={allCollections} />

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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
