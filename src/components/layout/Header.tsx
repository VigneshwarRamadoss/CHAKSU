"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/commerce/CartProvider";
import styles from "./Header.module.css";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { cart, openDrawer: openCartDrawer } = useCart();

  // Scrolled state detection via IntersectionObserver sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    }, { threshold: 0 });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const openDrawer = () => {
    setIsMobileMenuOpen(true);
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    setIsMobileMenuOpen(false);
    dialogRef.current?.close();
    document.body.style.overflow = '';
  };

  // Close the mobile menu only when navigation changes the route. Depending on
  // `isMobileMenuOpen` here caused the dialog to close immediately after open.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsMobileMenuOpen(false);
      dialogRef.current?.close();
      document.body.style.overflow = "";
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Handle native close event (e.g. Escape key)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    };

    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, []);

  return (
    <>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />

      <header className={styles.header} data-scrolled={isScrolled}>
        <button 
          ref={triggerRef}
          className={styles.mobileMenuTrigger} 
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          onClick={openDrawer}
        >
          Menu
        </button>

        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <Link href="/collections/new-release" className={styles.navLink} aria-current={pathname === "/collections/new-release" ? "page" : undefined}>
            <span>01</span> New Release
          </Link>
          <Link href="/collections/all" className={styles.navLink} aria-current={pathname === "/collections/all" ? "page" : undefined}>
            <span>02</span> Shop
          </Link>
          <Link href="/stories" className={styles.navLink} aria-current={pathname === "/stories" ? "page" : undefined}>
            <span>03</span> Stories
          </Link>
          <Link href="/about" className={styles.navLink} aria-current={pathname === "/about" ? "page" : undefined}>
            <span>04</span> About
          </Link>
        </nav>

        <Link href="/" className={styles.wordmark} aria-label="CHAKSU Home">
          <span className={styles.brandDevice} aria-hidden="true">K/</span> CHAKSU
        </Link>

        <nav className={styles.utilityNav} aria-label="Utility Navigation">
          <span className={styles.liveStatus} aria-hidden="true">Drop 001 / Live</span>
          <Link href="/search" className={styles.utilityLink} aria-current={pathname === "/search" ? "page" : undefined}>
            Search
          </Link>
          <button
            type="button"
            className={styles.utilityLink}
            onClick={openCartDrawer}
            aria-label={`Shopping bag, ${cart.totalQuantity} items`}
          >
            Bag ({cart.totalQuantity})
          </button>
        </nav>

        {/* Mobile Drawer (Native Dialog) */}
        <dialog 
          ref={dialogRef}
          className={styles.mobileDrawer}
          aria-label="Mobile Navigation"
        >
          <div className={styles.drawerHeader}>
            <button 
              className={styles.mobileMenuClose} 
              aria-label="Close menu"
              onClick={closeDrawer}
              autoFocus
            >
              Close
            </button>
            <span className={styles.wordmark}>CHAKSU</span>
          </div>

          <nav className={styles.mobileNav} aria-label="Mobile Navigation Menu">
            <Link href="/collections/new-release" className={styles.mobileNavLink} onClick={closeDrawer}>
              <span className={styles.mobileNavIndex}>01</span>
              <span className={styles.mobileNavLabel}>New Release</span>
            </Link>
            <Link href="/collections/all" className={styles.mobileNavLink} onClick={closeDrawer}>
              <span className={styles.mobileNavIndex}>02</span>
              <span className={styles.mobileNavLabel}>Shop All</span>
            </Link>
            <Link href="/stories" className={styles.mobileNavLink} onClick={closeDrawer}>
              <span className={styles.mobileNavIndex}>03</span>
              <span className={styles.mobileNavLabel}>Stories</span>
            </Link>
            <Link href="/about" className={styles.mobileNavLink} onClick={closeDrawer}>
              <span className={styles.mobileNavIndex}>04</span>
              <span className={styles.mobileNavLabel}>About</span>
            </Link>
          </nav>
        </dialog>
      </header>
    </>
  );
}
