"use client";

import { useState } from "react";
import styles from "./NewsletterModule.module.css";
import { IntersectionReveal } from "../motion/IntersectionReveal";

export function NewsletterModule() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 800);
  };

  return (
    <section className={styles.newsletterSection}>
      <IntersectionReveal>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Join the list</h2>
          <p className={styles.newsletterDesc}>Exclusive access to releases and editorial stories.</p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
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
                disabled={status === "loading" || status === "success"}
              />
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={status === "loading" || status === "success" || !email}
              >
                {status === "loading" ? "..." : status === "success" ? "Subscribed" : "Submit"}
              </button>
            </div>
            {status === "success" && (
              <p className={styles.successMessage} role="status">
                You have been added to the list.
              </p>
            )}
          </form>
        </div>
      </IntersectionReveal>
    </section>
  );
}
