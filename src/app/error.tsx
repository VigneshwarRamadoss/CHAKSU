"use client";

import { useEffect } from "react";
import styles from "./SystemPage.module.css";

export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>System / Interrupted</p>
        <h1 className={styles.title}>Signal Lost</h1>
        <p className={styles.intro}>The page could not complete this request. Your bag remains stored on this device.</p>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryAction} onClick={retry}>Try Again</button>
        </div>
      </section>
    </div>
  );
}
