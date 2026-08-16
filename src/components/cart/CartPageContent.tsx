"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/commerce/CartProvider";
import { formatINRPrice, MAX_LINE_QUANTITY } from "@/lib/commerce/adapter";
import styles from "./CartPage.module.css";

export function CartPageContent() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const checkoutUrl = cart.checkoutUrl?.startsWith("https://") ? cart.checkoutUrl : undefined;

  if (cart.lines.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2 className={styles.emptyTitle}>Your Bag is Empty</h2>
        <p className={styles.emptyDesc}>
          Browse the CHAKSU archive and add something to your bag.
        </p>
        <Link href="/collections/all" className={styles.continueLink}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartLayout}>
      <div className={styles.linesCol}>
        <ul className={styles.lineList}>
          {cart.lines.map(line => (
            <li key={line.variantId} className={styles.lineItem}>
              <div className={styles.lineImage}>
                {line.image && (
                  <Image
                    src={line.image}
                    alt={line.imageAlt || line.productTitle}
                    fill
                    className={styles.lineImg}
                    sizes="100px"
                  />
                )}
              </div>

              <div className={styles.lineInfo}>
                <Link
                  href={`/products/${line.productHandle}`}
                  className={styles.lineTitle}
                >
                  {line.productTitle}
                </Link>
                <span className={styles.lineVariant}>{line.variantTitle}</span>
                <span className={styles.lineUnitPrice}>
                  {formatINRPrice(line.price.amount)} each
                </span>

                <div className={styles.qtyControls}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
                    aria-label={`Decrease quantity of ${line.productTitle}`}
                    disabled={line.quantity <= 1}
                  >
                    −
                  </button>
                  <span className={styles.qtyValue} aria-label={`Quantity: ${line.quantity}`}>
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
                    aria-label={`Increase quantity of ${line.productTitle}`}
                    disabled={line.quantity >= MAX_LINE_QUANTITY}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.lineActions}>
                <span className={styles.lineTotal}>
                  {formatINRPrice(line.price.amount * line.quantity)}
                </span>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(line.variantId)}
                  aria-label={`Remove ${line.productTitle} from cart`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.summaryCol}>
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>
              {cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"}
            </span>
            <span className={styles.summaryValue}>
              {formatINRPrice(cart.subtotal.amount)}
            </span>
          </div>

          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalValue}>
              {formatINRPrice(cart.subtotal.amount)}
            </span>
          </div>

          {checkoutUrl ? (
            <a href={checkoutUrl} className={styles.checkoutBtn}>Secure Checkout</a>
          ) : (
            <button type="button" className={`${styles.checkoutBtn} ${styles.checkoutBtnDisabled}`} disabled>
              Checkout Unavailable
            </button>
          )}

          <p className={styles.checkoutNote}>
            Shipping and taxes are calculated at checkout. Secure checkout activates when the live store connection is available.
          </p>
        </div>
      </div>
    </div>
  );
}
