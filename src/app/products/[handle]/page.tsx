import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts, formatINRPrice } from "@/lib/commerce/adapter";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductGrid } from "@/components/shop/ProductGrid";
import styles from "@/components/product/PDP.module.css";

type PageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return { title: "Product Not Found — CHAKSU" };
  }

  const price = formatINRPrice(product.priceRange.minVariantPrice.amount);
  const primaryImage = product.media[0]?.url;

  return {
    title: `${product.title} — CHAKSU`,
    description: product.description,
    openGraph: primaryImage
      ? {
          title: `${product.title} — CHAKSU`,
          description: `${product.title} · ${price}`,
          images: [{ url: primaryImage }],
        }
      : undefined,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <div className={styles.pdpPage}>
      <div className={styles.container}>
        <ProductInfo product={product} />

        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>You May Also Like</h2>
            <ProductGrid products={relatedProducts} totalCount={relatedProducts.length} />
          </section>
        )}
      </div>

      {/* Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.media[0]?.url,
            offers: {
              "@type": "Offer",
              price: product.priceRange.minVariantPrice.amount,
              priceCurrency: product.priceRange.minVariantPrice.currencyCode,
              availability: product.availableForSale
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
    </div>
  );
}
