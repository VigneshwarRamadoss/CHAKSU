"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FilterMetadata } from "@/lib/commerce/adapter";
import styles from "./Shop.module.css";

const COLOR_SWATCH_MAP: Record<string, string> = {
  black: "#0A0A0A",
  bone: "#F2EFE6",
  olive: "#4B5320",
  charcoal: "#36454F",
};

type FilterSidebarProps = {
  filterMetadata: FilterMetadata;
};

export function FilterSidebar({ filterMetadata }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.getAll("category");
  const selectedColor = searchParams.getAll("color");
  const selectedSize = searchParams.getAll("size");
  const availableOnly = searchParams.get("available") === "true";

  const toggleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (key === "available") {
      if (availableOnly) {
        params.delete("available");
      } else {
        params.set("available", "true");
      }
    } else {
      const currentValues = params.getAll(key);
      params.delete(key);
      
      if (currentValues.includes(value)) {
        currentValues.filter(v => v !== value).forEach(v => params.append(key, v));
      } else {
        [...currentValues, value].forEach(v => params.append(key, v));
      }
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearAll = () => {
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

  const hasActiveFilters = selectedCategory.length > 0 || selectedColor.length > 0 || selectedSize.length > 0 || availableOnly;

  return (
    <aside className={styles.desktopSidebarCol} aria-label="Desktop Product Filters">
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>Refine</span>
        {hasActiveFilters && (
          <button type="button" className={styles.clearAllBtn} onClick={handleClearAll}>
            Reset
          </button>
        )}
      </div>

      {/* Availability */}
      <div className={styles.filterGroup}>
        <span className={styles.filterGroupTitle}>Availability</span>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={availableOnly}
            onChange={() => toggleFilter("available", "true")}
          />
          In Stock Only
        </label>
      </div>

      {/* Categories */}
      <div className={styles.filterGroup}>
        <span className={styles.filterGroupTitle}>Category</span>
        {filterMetadata.categories.map(cat => (
          <label key={cat.value} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={selectedCategory.includes(cat.value)}
              onChange={() => toggleFilter("category", cat.value)}
            />
            {cat.label} ({cat.count})
          </label>
        ))}
      </div>

      {/* Color Visual Swatches */}
      <div className={styles.filterGroup}>
        <span className={styles.filterGroupTitle}>Color</span>
        <div className={styles.swatchList}>
          {filterMetadata.colors.map(color => {
            const isSelected = selectedColor.includes(color.value);
            const hex = COLOR_SWATCH_MAP[color.value.toLowerCase()] || "#888888";
            const isLight = color.value.toLowerCase() === "bone";

            return (
              <label key={color.value} className={styles.swatchLabel}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => toggleFilter("color", color.value)}
                />
                <span
                  className={`${styles.swatchCircle} ${isSelected ? styles.swatchSelected : ""}`}
                  style={{ backgroundColor: hex }}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <span className={styles.swatchCheck} style={{ color: isLight ? "#0A0A0A" : "#F2EFE6" }}>
                      ✓
                    </span>
                  )}
                </span>
                <span className={styles.swatchText}>{color.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className={styles.filterGroup}>
        <span className={styles.filterGroupTitle}>Size</span>
        {filterMetadata.sizes.map(size => (
          <label key={size.value} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={selectedSize.includes(size.value)}
              onChange={() => toggleFilter("size", size.value)}
            />
            Size {size.label}
          </label>
        ))}
      </div>
    </aside>
  );
}
