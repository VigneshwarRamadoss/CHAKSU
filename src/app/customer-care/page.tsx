import type { Metadata } from "next";
import Link from "next/link";
import styles from "../SystemPage.module.css";

export const metadata: Metadata = {
  title: "Customer Care",
  description: "CHAKSU shipping, returns, sizing, and order support guidance.",
};

export default function CustomerCarePage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Service / Customer Care</p>
        <h1 className={styles.title}>Wear It Forward</h1>
        <p className={styles.intro}>Practical guidance for delivery, fit, returns, and existing orders.</p>
      </header>
      <div className={styles.sections}>
        <section id="shipping" className={styles.section}>
          <h2>Shipping</h2>
          <p>Orders ship from India. Available delivery services, costs, estimated dates, duties, and taxes are shown before payment. Tracking is sent after dispatch.</p>
        </section>
        <section id="returns" className={styles.section}>
          <h2>Returns</h2>
          <p>Return eligibility and the applicable request window are shown during checkout. Items must remain unworn, unwashed, and attached to their original tags. Final-sale and hygiene-sensitive items may be excluded.</p>
        </section>
        <section id="sizing" className={styles.section}>
          <h2>Sizing</h2>
          <p>Use the product-specific size guide on each product page. CHAKSU silhouettes are intentionally relaxed; compare the garment measurements with a piece you already own.</p>
        </section>
        <section id="orders" className={styles.section}>
          <h2>Order Support</h2>
          <p>For an existing order, reply to the order-confirmation email so the team can identify the correct purchase. Include the order number, but never send card or account credentials.</p>
          <div className={styles.actions}>
            <Link href="/collections/all" className={styles.primaryAction}>Continue Shopping</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
