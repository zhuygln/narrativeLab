"use client";

import { useState } from "react";
import type { Event, StructuralForce, Narrative, Gap, Relationship } from "@/types/narrative";
import styles from "./P1Narrative.module.css";

interface P1NarrativeProps {
  narrative: Narrative;
  events: Event[];
  forces: StructuralForce[];
  gaps: Gap[];
  relationships: Relationship[];
}

type RevealLevel = 0 | 1 | 2; // 0 = title only, 1 = summary, 2 = source link

interface NodeState {
  [nodeId: string]: RevealLevel;
}

export default function P1Narrative({
  narrative,
  events,
  forces,
  gaps,
  relationships,
}: P1NarrativeProps) {
  const [nodeStates, setNodeStates] = useState<NodeState>({});

  // Filter events relevant to this narrative via relationships
  const narrativeForceIds = forces
    .filter((f) =>
      relationships.some(
        (r) =>
          r.type === "INFLUENCES" &&
          r.source_id === f.id &&
          events.some((e) => e.id === r.target_id)
      )
    )
    .map((f) => f.id);

  const handleNodeTap = (id: string) => {
    setNodeStates((prev) => {
      const current = prev[id] ?? 0;
      const next = Math.min(current + 1, 2) as RevealLevel;
      return { ...prev, [id]: next };
    });
  };

  // Sort events chronologically
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.label}>{narrative.label}</h2>
        <p className={styles.sources}>
          {narrative.source_mapping.join(" · ")}
        </p>
      </header>

      {/* Vertical timeline */}
      <div className={styles.timeline}>
        {sortedEvents.map((event, i) => {
          const level = nodeStates[event.id] ?? 0;
          // Find forces that influence this event
          const influencingForces = forces.filter((f) =>
            relationships.some(
              (r) =>
                r.type === "INFLUENCES" &&
                r.source_id === f.id &&
                r.target_id === event.id
            )
          );

          return (
            <div key={event.id} className={styles.timelineItem}>
              {/* Timeline spine */}
              {i < sortedEvents.length - 1 && (
                <div className={styles.spine} />
              )}

              {/* Event node */}
              <button
                className={styles.eventNode}
                onClick={() => handleNodeTap(event.id)}
                aria-label={`Reveal more about: ${event.title}`}
              >
                <div className={styles.eventDot} />
                <div className={styles.eventContent}>
                  <span className={styles.eventDate}>
                    {new Date(event.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className={styles.eventTitle}>{event.title}</span>

                  {/* Level 1: summary */}
                  {level >= 1 && (
                    <p className={styles.eventSummary}>{event.summary_short}</p>
                  )}

                  {/* Level 2: source link */}
                  {level >= 2 && (
                    <a
                      href={event.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.eventSource}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View source &rarr;
                    </a>
                  )}
                </div>
              </button>

              {/* Branching force nodes */}
              {influencingForces.map((force) => {
                const fLevel = nodeStates[force.id] ?? 0;
                return (
                  <button
                    key={force.id}
                    className={styles.forceNode}
                    onClick={() => handleNodeTap(force.id)}
                    aria-label={`Reveal more about force: ${force.label}`}
                  >
                    <div className={styles.forceDot} />
                    <span className={styles.forceLabel}>{force.label}</span>
                    {fLevel >= 1 && (
                      <span className={styles.forceMeta}>
                        {force.category} · {force.direction}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}

        {/* Gap nodes at the bottom */}
        {gaps.map((gap) => {
          const gLevel = nodeStates[gap.id] ?? 0;
          return (
            <button
              key={gap.id}
              className={styles.gapNode}
              onClick={() => handleNodeTap(gap.id)}
              aria-label={`Reveal more about gap: ${gap.description}`}
            >
              <div className={styles.gapDot} />
              <span className={styles.gapLabel}>{gap.description}</span>
              {gLevel >= 1 && (
                <p className={styles.gapMeta}>
                  Impact: {gap.impact}
                </p>
              )}
              {gLevel >= 2 && (
                <p className={styles.gapResolution}>
                  Path: {gap.resolution_path}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Key assertions */}
      <footer className={styles.footer}>
        <h3>Key Assertions</h3>
        <ul className={styles.assertions}>
          {narrative.key_assertions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
        {narrative.omissions.length > 0 && (
          <>
            <h3 className={styles.omissionsHeading}>What This Narrative Omits</h3>
            <ul className={styles.omissions}>
              {narrative.omissions.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </>
        )}
      </footer>
    </div>
  );
}
