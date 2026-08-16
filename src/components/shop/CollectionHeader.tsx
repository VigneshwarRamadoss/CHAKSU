import Link from "next/link";
import { Collection } from "@/lib/data/fixtures";
import styles from "./Shop.module.css";

type CollectionHeaderProps = {
  collection: Collection;
  allCollections: Collection[];
};

export function CollectionHeader({ collection, allCollections }: CollectionHeaderProps) {
  return (
    <header className={styles.collectionHeader}>
      <div className={styles.headerTitleRow}>
        <h1 className={styles.collectionTitle}>{collection.title}</h1>
        {collection.description && (
          <p className={styles.collectionDesc}>{collection.description}</p>
        )}
      </div>

      <nav className={styles.collectionNav} aria-label="Collections Navigation">
        {allCollections.map(c => {
          const isActive = c.handle === collection.handle;
          return (
            <Link
              key={c.id}
              href={`/collections/${c.handle}`}
              className={`${styles.tabLink} ${isActive ? styles.tabLinkActive : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {c.title}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
