"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FilterMetadata } from "@/lib/commerce/adapter";
import styles from "./Shop.module.css";

const COLOR_SWATCH_MAP: Record<string, string> = {
  black: "#0A0A0A",
  bone: "#F2EFE6",
  olive: "#4B5320",
  charcoal: "#36454F",
};

type FilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  filterMetadata: FilterMetadata;
};

export function FilterDrawer({ isOpen, onClose, filterMetadata }: FilterDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state initialized from URL searchParams
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);

  // Sync state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setSelectedCategory(searchParams.getAll("category"));
        setSelectedColor(searchParams.getAll("color"));
        setSelectedSize(searchParams.getAll("size"));
        setAvailableOnly(searchParams.get("available") === "true");
      }, 0);

      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = "";
    }
  }, [isOpen, searchParams]);

  // Handle native ESC key close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => {
      onClose();
      document.body.style.overflow = "";
    };

    dialog.addEventListener("close", handleNativeClose);
    return () => dialog.removeEventListener("close", handleNativeClose);
  }, [onClose]);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset page on filter change
    params.delete("page");

    // Categories
    params.delete("category");
    selectedCategory.forEach(cat => params.append("category", cat));

    // Colors
    params.delete("color");
    selectedColor.forEach(c => params.append("color", c));

    // Sizes
    params.delete("size");
    selectedSize.forEach(s => params.append("size", s));

    // Availability
    if (availableOnly) {
      params.set("available", "true");
    } else {
      params.delete("available");
    }

    router.push(`${pathname}?${params.toString()}`);
    onClose();
  };

  const handleClearAll = () => {
    setSelectedCategory([]);
    setSelectedColor([]);
    setSelectedSize([]);
    setAvailableOnly(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("color");
    params.delete("size");
    params.delete("available");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
    onClose();
  };

  const toggleArrayItem = (arr: string[], item: string) => {
    return arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];
  };

  return (
    <dialog ref={dialogRef} className={styles.filterDialog} aria-label="Filter Options">
      <div className={styles.drawerHeader}>
        <h2 className={styles.drawerTitle}>Refine Results</h2>
        <button 
          type="button" 
          className={styles.drawerCloseBtn} 
          onClick={onClose}
          aria-label="Close filters"
          autoFocus
        >
          Close
        </button>
      </div>

      <div className={styles.drawerBody}>
        {/* Availability */}
        <div className={styles.filterGroup}>
          <span className={styles.filterGroupTitle}>Availability</span>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={availableOnly}
              onChange={e => setAvailableOnly(e.target.checked)}
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
                onChange={() => setSelectedCategory(prev => toggleArrayItem(prev, cat.value))}
              />
              {cat.label} ({cat.count})
            </label>
          ))}
        </div>

        {/* Colors */}
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
                    onChange={() => setSelectedColor(prev => toggleArrayItem(prev, color.value))}
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
                onChange={() => setSelectedSize(prev => toggleArrayItem(prev, size.value))}
              />
              Size {size.label}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.drawerFooter}>
        <button type="button" className={styles.applyBtn} onClick={handleApply}>
          Apply Filters
        </button>
        <button type="button" className={styles.resetBtn} onClick={handleClearAll}>
          Reset
        </button>
      </div>
    </dialog>
  );
}
