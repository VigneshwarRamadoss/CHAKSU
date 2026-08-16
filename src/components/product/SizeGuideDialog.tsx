"use client";

import { useRef, useEffect } from "react";
import type { Product } from "@/lib/data/fixtures";
import styles from "./PDP.module.css";

type SizeGuideDialogProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

const TOP_MEASUREMENTS = [
  ["S", "40", "27", "19"],
  ["M", "42", "28", "20"],
  ["L", "44", "29", "21"],
  ["XL", "46", "30", "22"],
];

const BOTTOM_MEASUREMENTS = [
  ["S / 30", "30–32", "30", "41", "16"],
  ["M / 32", "32–34", "30.5", "42", "17"],
  ["L / 34", "34–36", "31", "43", "18"],
  ["XL / 36", "36–38", "31.5", "44", "19"],
];

export function SizeGuideDialog({ product, isOpen, onClose }: SizeGuideDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const isBottom = /pant|trouser|cargo/i.test(product.title);
  const isBag = /bag|tote/i.test(product.title);

  return (
    <dialog ref={dialogRef} className={styles.sizeGuideDialog} aria-label="Size Guide">
      <div className={styles.sizeGuideHeader}>
        <h2 className={styles.sizeGuideTitle}>Size Guide</h2>
        <button
          type="button"
          className={styles.sizeGuideCloseBtn}
          onClick={onClose}
          aria-label="Close size guide"
          autoFocus
        >
          Close
        </button>
      </div>

      <div className={styles.sizeGuideBody}>
        <p className={styles.sizeProductName}>{product.title}</p>
        {isBag ? (
          <dl className={styles.dimensionList}>
            <div><dt>Fit</dt><dd>One size</dd></div>
            <div><dt>Carry profile</dt><dd>18 L everyday capacity</dd></div>
            <div><dt>Laptop sleeve</dt><dd>Up to 15 inches</dd></div>
          </dl>
        ) : (
          <div className={styles.sizeTableWrap}>
            <table className={styles.sizeTable}>
              <caption className="sr-only">Garment measurements for {product.title}</caption>
              <thead>
                <tr>
                  {isBottom ? (
                    <><th>Size</th><th>Waist (in)</th><th>Inseam (in)</th><th>Outseam (in)</th><th>Hem (in)</th></>
                  ) : (
                    <><th>Size</th><th>Chest (in)</th><th>Length (in)</th><th>Shoulder (in)</th></>
                  )}
                </tr>
              </thead>
              <tbody>
                {(isBottom ? BOTTOM_MEASUREMENTS : TOP_MEASUREMENTS).map(row => (
                  <tr key={row[0]}>{row.map(value => <td key={value}>{value}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className={styles.sizeNote}>
          Garment measurements, not body measurements. Allow up to 0.5 in variation. If you are between sizes, choose the larger size for the intended relaxed silhouette.
        </p>
      </div>
    </dialog>
  );
}
