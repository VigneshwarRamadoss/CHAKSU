"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/commerce/CartProvider";
import { formatINRPrice, MAX_LINE_QUANTITY } from "@/lib/commerce/adapter";
import styles from "./CartDrawer.module.css";

export function CartDrawer() {
  const {
    cart,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isDrawerOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!isDrawerOpen && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      closeDrawer();
      document.body.style.overflow = "";
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [closeDrawer]);

  return (
    <dialog ref={dialogRef} className={styles.drawer} aria-label="Shopping Cart">
      <div className={styles.drawerHeader}>
        <h2 className={styles.drawerTitle}>
          Bag ({cart.totalQuantity})
        </h2>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={closeDrawer}
          aria-label="Close cart"
          autoFocus
        >
          Close
        </button>
      </div>

      <div className={styles.drawerBody}>
        {cart.lines.length === 0 ? (
          <div className={styles.emptyCart}>
            <p className={styles.emptyText}>Your bag is empty.</p>
            <Link
              href="/collections/all"
              className={styles.shopLink}
              onClick={closeDrawer}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <ul className={styles.lineList}>
            {cart.lines.map(line => (
              <li key={line.variantId} className={styles.lineItem}>
                {line.image && (
                  <div className={styles.lineImage}>
                    <Image
                      src={line.image}
                      alt={line.imageAlt || line.productTitle}
                      width={80}
                      height={100}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                <div className={styles.lineInfo}>
                  <Link
                    href={`/products/${line.productHandle}`}
                    className={styles.lineTitle}
                    onClick={closeDrawer}
                  >
                    {line.productTitle}
                  </Link>
                  <span className={styles.lineVariant}>{line.variantTitle}</span>
                  <span className={styles.linePrice}>
                    {formatINRPrice(line.price.amount)}
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
        )}
      </div>

      {cart.lines.length > 0 && (
        <div className={styles.drawerFooter}>
          <div className={styles.subtotalRow}>
            <span className={styles.subtotalLabel}>Subtotal</span>
            <span className={styles.subtotalValue}>
              {formatINRPrice(cart.subtotal.amount)}
            </span>
          </div>
          <Link
            href="/cart"
            className={styles.viewCartBtn}
            onClick={closeDrawer}
          >
            View Cart
          </Link>
          <button type="button" className={styles.checkoutBtn} disabled>
            Checkout — Coming Soon
          </button>
        </div>
      )}
    </dialog>
  );
}
