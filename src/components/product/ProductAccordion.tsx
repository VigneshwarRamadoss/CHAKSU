"use client";

import { useState } from "react";
import styles from "./PDP.module.css";

type AccordionItem = {
  title: string;
  content: string;
};

export function ProductAccordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.accordion}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={styles.accordionItem}>
            <button
              type="button"
              className={styles.accordionTrigger}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              {item.title}
              <span className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ""}`}>
                +
              </span>
            </button>
            {isOpen && (
              <div className={styles.accordionContent}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
