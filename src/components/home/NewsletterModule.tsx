"use client";

import { useState } from "react";
import styles from "./NewsletterModule.module.css";
import { IntersectionReveal } from "../motion/IntersectionReveal";

export function NewsletterModule() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Subscription unavailable");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <IntersectionReveal>
        <div className={styles.newsletterContent}>
          <div className={styles.newsletterHeading}>
            <p className={styles.newsletterIndex}>Transmission / Members Only</p>
            <h2 className={styles.newsletterTitle}>Enter the<br /><span>signal.</span></h2>
          </div>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.newsletterDesc}>Early access to limited drops, field notes, and studio dispatches. No weekly noise.</p>
            <div className={styles.inputGroup}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                className={styles.input}
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onInput={() => status === "error" && setStatus("idle")}
                autoComplete="email"
                disabled={status === "loading" || status === "success"}
              />
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={status === "loading" || status === "success" || !email}
              >
                {status === "loading" ? "Transmitting..." : status === "success" ? "Signal received" : "Join CHAKSU ↗"}
              </button>
            </div>
            {status === "success" && (
              <p className={styles.successMessage} role="status">
                You have been added to the list.
              </p>
            )}
            {status === "error" && (
              <p className={styles.errorMessage} role="alert">
                Sign-up is temporarily unavailable. Please try again later.
              </p>
            )}
            <p className={styles.consentMessage}>
              By subscribing, you agree to receive CHAKSU release updates. Unsubscribe at any time. Drop frequency: irregular.
            </p>
          </form>
        </div>
      </IntersectionReveal>
    </section>
  );
}
