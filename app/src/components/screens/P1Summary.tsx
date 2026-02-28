"use client";

import type { Story } from "@/types/narrative";
import styles from "./P1Summary.module.css";

interface P1SummaryProps {
  story: Story;
}

export default function P1Summary({ story }: P1SummaryProps) {
  return (
    <div className={styles.card}>
      {/* Hero image area */}
      <div className={styles.hero}>
        {story.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={story.image_url} alt="" className={styles.heroImg} />
        ) : (
          <div className={styles.heroPlaceholder} />
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.headline}>{story.title}</h1>
        <p className={styles.summary}>{story.summary}</p>
      </div>

      {/* Navigation hints */}
      <div className={styles.hints}>
        <span className={styles.hintUp}>&#8593; Search</span>
        <span className={styles.hintLeft}>&#8592; {story.narratives[0].label}</span>
        <span className={styles.hintRight}>{story.narratives[1].label} &#8594;</span>
        <span className={styles.hintDown}>&#8595; Deep Dive</span>
      </div>
    </div>
  );
}
