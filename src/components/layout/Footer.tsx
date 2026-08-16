import Link from "next/link";
import { TheDotLogo } from "@/components/common/TheDotLogo";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Col 1: Brand Identity */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandTitle} aria-label="CHAKSU Home">
              CHAKSU
            </Link>
            <p className={styles.brandTagline}>
              Statement silhouettes. Proof in every detail. Built in movement, engineered for high-density urban environments.
            </p>
          </div>

          {/* Col 2: Shop Navigation */}
          <div>
            <h2 className={styles.sectionTitle}>Shop</h2>
            <ul className={styles.linkList}>
              <li><Link href="/collections/all" className={styles.link}>Shop All</Link></li>
              <li><Link href="/collections/new-release" className={styles.link}>New Release</Link></li>
              <li><Link href="/collections/k-line" className={styles.link}>K-Line Series</Link></li>
              <li><Link href="/collections/outerwear" className={styles.link}>Technical Outerwear</Link></li>
              <li><Link href="/collections/utility" className={styles.link}>Utility & Cargo</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Care / Info */}
          <div>
            <h2 className={styles.sectionTitle}>Explore</h2>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.link}>About CHAKSU</Link></li>
              <li><Link href="/search" className={styles.link}>Search Archive</Link></li>
              <li><Link href="/cart" className={styles.link}>View Bag</Link></li>
            </ul>
          </div>

          {/* Col 4: Region & Currency */}
          <div>
            <h2 className={styles.sectionTitle}>Region</h2>
            <p className={styles.regionText}>India / INR (₹)</p>
            <p className={styles.regionNote}>
              Prices include local duties & taxes where applicable.
            </p>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} CHAKSU. All rights reserved.
          </p>
          <div className={styles.designCredit}>
            <TheDotLogo size={14} className={styles.dotLogo} />
            <span>Design Rights — <strong>The Dot</strong></span>
          </div>
          <span className={styles.monoBrand}>STATEMENT SILHOUETTES</span>
        </div>
      </div>
    </footer>
  );
}
