"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Shop.module.css";

type SearchFormProps = {
  initialQuery?: string;
};

export function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("q", trimmed);
    params.delete("page"); // Reset page

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className={styles.searchSection}>
      <form role="search" method="GET" action="/search" onSubmit={handleSubmit} className={styles.searchForm}>
        <label htmlFor="search-input" className="sr-only">Search products</label>
        <input
          id="search-input"
          name="q"
          type="search"
          className={styles.searchInput}
          placeholder="SEARCH ARCHIVE (E.G. CARGO, TEE, MONSOON)..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          required
          autoComplete="off"
        />
        <button type="submit" className={styles.searchSubmitBtn}>
          Search
        </button>
      </form>
    </div>
  );
}
