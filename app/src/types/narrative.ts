/* ── Narrative Schema ── */
/* Core data model: Event, StructuralForce, Narrative, Gap */
/* See docs/design/narrative_schema.md for full specification */

export interface Event {
  id: string;
  timestamp: string; // ISO8601
  title: string; // Glance (Level 1)
  summary_short: string; // Context (Level 2)
  summary_expanded: string; // Panel detail
  source_url: string; // Evidence (Level 3)
  location?: string;
  actors?: string[];
  evidence?: string[];
}

export type ForceCategory =
  | "Economic"
  | "Demographic"
  | "Geographic"
  | "Institutional"
  | "Cultural";

export interface StructuralForce {
  id: string;
  label: string;
  category: ForceCategory;
  strength: number; // 0–1 scale
  direction: string;
  linked_events: string[]; // Event IDs
}

export interface Narrative {
  id: string;
  label: string;
  source_mapping: string[];
  key_assertions: string[];
  omissions: string[];
}

export interface Gap {
  id: string;
  description: string;
  impact: string;
  resolution_path: string;
}

/* ── Relationships ── */

export type RelationshipType =
  | "PRECEDES"      // Event → Event
  | "INFLUENCES"    // Force → Event
  | "CONTRADICTS"   // Narrative → Narrative
  | "SUPPORTS";     // Evidence → Assertion

export interface Relationship {
  id: string;
  type: RelationshipType;
  source_id: string;
  target_id: string;
  metadata?: Record<string, string>;
}

/* ── Story (aggregate root) ── */

export interface Story {
  id: string;
  title: string;
  summary: string;
  image_url?: string;
  events: Event[];
  forces: StructuralForce[];
  narratives: [Narrative, Narrative]; // Exactly two for P1L / P1R
  gaps: Gap[];
  relationships: Relationship[];
  created_at: string;
}

/* ── Navigation ── */

export type Screen = "P0" | "P1" | "P1L" | "P1R" | "P2";

export type SwipeDirection = "up" | "down" | "left" | "right";
