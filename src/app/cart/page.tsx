import { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";
import styles from "@/components/cart/CartPage.module.css";

export const metadata: Metadata = {
  title: "Your Bag — CHAKSU",
  description: "Review your CHAKSU selections.",
};

export default function CartPage() {
  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <header className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>Your Bag</h1>
        </header>
        <CartPageContent />
      </div>
    </div>
  );
}
