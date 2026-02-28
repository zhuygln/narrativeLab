"use client";

import { useState } from "react";
import styles from "./P0Entry.module.css";

interface P0EntryProps {
  onSubmit: (query: string) => void;
  onLucky: () => void;
  history: { id: string; title: string }[];
  onHistorySelect: (id: string) => void;
}

export default function P0Entry({
  onSubmit,
  onLucky,
  history,
  onHistorySelect,
}: P0EntryProps) {
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSubmit(query.trim());
  };

  return (
    <div className={styles.container}>
      {/* History drawer toggle */}
      <button
        className={styles.historyToggle}
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-label="Toggle history"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </button>

      {/* History drawer */}
      {drawerOpen && (
        <div className={styles.drawer}>
          <h3>Recent Stories</h3>
          {history.length === 0 && (
            <p className={styles.drawerEmpty}>No history yet.</p>
          )}
          <ul className={styles.drawerList}>
            {history.map((item) => (
              <li key={item.id}>
                <button onClick={() => onHistorySelect(item.id)}>
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Center content */}
      <div className={styles.center}>
        <h1 className={styles.logo}>Narrative Lab</h1>
        <p className={styles.tagline}>Context before conclusion.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe a story, paste a URL, or speak..."
            autoFocus
          />
          <div className={styles.actions}>
            <button type="submit" className={styles.btnPrimary}>
              Submit
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={onLucky}
            >
              I&apos;m Feeling Lucky
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
