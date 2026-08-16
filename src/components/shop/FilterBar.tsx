"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FilterMetadata, SortOption } from "@/lib/commerce/adapter";
import { FilterDrawer } from "./FilterDrawer";
import styles from "./Shop.module.css";

type FilterBarProps = {
  totalCount: number;
  filterMetadata: FilterMetadata;
};

export function FilterBar({ totalCount, filterMetadata }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentSort = (searchParams.get("sort") as SortOption) || "featured";
  const categories = searchParams.getAll("category");
  const colors = searchParams.getAll("color");
  const sizes = searchParams.getAll("size");
  const availableOnly = searchParams.get("available") === "true";

  const activeChips: { key: string; value: string; label: string }[] = [];

  categories.forEach(cat => {
    activeChips.push({ key: "category", value: cat, label: `Category: ${cat.toUpperCase()}` });
  });

  colors.forEach(col => {
    activeChips.push({ key: "color", value: col, label: `Color: ${col}` });
  });

  sizes.forEach(sz => {
    activeChips.push({ key: "size", value: sz, label: `Size: ${sz.toUpperCase()}` });
  });

  if (availableOnly) {
    activeChips.push({ key: "available", value: "true", label: "In Stock Only" });
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const removeChip = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "available") {
      params.delete("available");
    } else {
      const values = params.getAll(key).filter(v => v !== value);
      params.delete(key);
      values.forEach(v => params.append(key, v));
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("color");
    params.delete("size");
    params.delete("available");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.controlsRow}>
        <span className={styles.resultCount}>
          {totalCount} {totalCount === 1 ? "Product" : "Products"}
        </span>

        <div className={styles.actionControls}>
          <button 
            type="button" 
            className={styles.filterTriggerBtn}
            onClick={() => setIsDrawerOpen(true)}
            aria-expanded={isDrawerOpen}
            aria-label="Filter options"
          >
            Filters {activeChips.length > 0 ? `(${activeChips.length})` : ""}
          </button>

          <label htmlFor="sort-select" className="sr-only">Sort by</label>
          <select
            id="sort-select"
            className={styles.sortSelect}
            value={currentSort}
            onChange={handleSortChange}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className={styles.chipsContainer} aria-label="Active Filters">
          {activeChips.map((chip, idx) => (
            <span key={`${chip.key}-${chip.value}-${idx}`} className={styles.chip}>
              {chip.label}
              <button
                type="button"
                className={styles.chipRemoveBtn}
                onClick={() => removeChip(chip.key, chip.value)}
                aria-label={`Remove filter ${chip.label}`}
              >
                ×
              </button>
            </span>
          ))}

          <button
            type="button"
            className={styles.clearAllBtn}
            onClick={clearAll}
            aria-label="Clear all active filters"
          >
            Clear All
          </button>
        </div>
      )}

      <FilterDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        filterMetadata={filterMetadata}
      />
    </div>
  );
}
