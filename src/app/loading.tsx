import styles from "./SystemPage.module.css";

export default function Loading() {
  return (
    <div className={styles.page} aria-live="polite" aria-busy="true">
      <section className={styles.hero}>
        <p className={styles.eyebrow}>CHAKSU / Loading</p>
        <h1 className={styles.title}>Hold Position</h1>
        <div className={styles.loadingLine} aria-hidden="true" />
      </section>
    </div>
  );
}
