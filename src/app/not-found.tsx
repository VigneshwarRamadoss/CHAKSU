import Link from "next/link";
import styles from "./SystemPage.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Error / 404</p>
        <h1 className={styles.title}>Off Grid</h1>
        <p className={styles.intro}>This route has moved, sold through, or never entered the CHAKSU archive.</p>
        <div className={styles.actions}>
          <Link href="/collections/all" className={styles.primaryAction}>Shop the Archive</Link>
          <Link href="/" className={styles.secondaryAction}>Return Home</Link>
        </div>
      </section>
    </div>
  );
}
