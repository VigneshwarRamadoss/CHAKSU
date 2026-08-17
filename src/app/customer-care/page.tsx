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
      <nav className={styles.serviceNav} aria-label="Customer care topics">
        <Link href="#shipping"><span>01</span> Shipping</Link>
        <Link href="#returns"><span>02</span> Returns</Link>
        <Link href="#sizing"><span>03</span> Sizing</Link>
        <Link href="#orders"><span>04</span> Order Support</Link>
      </nav>
      <div className={styles.sections}>
        <section id="shipping" className={styles.section}>
          <div className={styles.sectionHeading}><span>01 / Dispatch</span><h2>Shipping</h2></div>
          <div className={styles.sectionBody}><p>Orders ship from India. Available delivery services, costs, estimated dates, duties, and taxes are shown before payment. Tracking is sent after dispatch.</p><p className={styles.sectionNote}>Origin / Chennai, India</p></div>
        </section>
        <section id="returns" className={styles.section}>
          <div className={styles.sectionHeading}><span>02 / Reset</span><h2>Returns</h2></div>
          <div className={styles.sectionBody}><p>Return eligibility and the applicable request window are shown during checkout. Items must remain unworn, unwashed, and attached to their original tags. Final-sale and hygiene-sensitive items may be excluded.</p><p className={styles.sectionNote}>Condition / Original and unworn</p></div>
        </section>
        <section id="sizing" className={styles.section}>
          <div className={styles.sectionHeading}><span>03 / Fit</span><h2>Sizing</h2></div>
          <div className={styles.sectionBody}><p>Use the product-specific size guide on each product page. CHAKSU silhouettes are intentionally relaxed; compare the garment measurements with a piece you already own.</p><p className={styles.sectionNote}>Method / Garment measurement</p></div>
        </section>
        <section id="orders" className={styles.section}>
          <div className={styles.sectionHeading}><span>04 / Support</span><h2>Order Support</h2></div>
          <div className={styles.sectionBody}>
            <p>For an existing order, reply to the order-confirmation email so the team can identify the correct purchase. Include the order number, but never send card or account credentials.</p>
            <div className={styles.actions}>
              <Link href="/collections/all" className={styles.primaryAction}>Continue Shopping</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
