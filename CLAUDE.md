# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Narrative Lab transforms reactive news consumption into structured, contextual understanding. It treats news stories as systems driven by structural forces rather than isolated events. Core philosophy: **"Context before conclusion."**

The project is currently in the **design/planning phase** — no application code has been implemented yet. Comprehensive design documentation and wireframes are complete.

## Planned Tech Stack

- **Frontend**: Next.js (App Router) + React
- **Styling**: Vanilla CSS + Framer Motion (spring-like flashcard transitions)
- **Graph Visualization**: React Flow or D3.js or Cytoscape.js (for interactive story timelines)
- **Database**: Supabase (PostgreSQL + pgvector for vector/semantic search)
- **License**: Apache 2.0

## Architecture

### Data Model: The Narrative Schema

Four core entities connected by typed relationships:

- **Event** — Atomic facts with tiered detail: `title` (graph dot label) → `summary_short` (hover) → `summary_expanded` (panel) → `source_url` (evidence link)
- **Structural Force** — Invisible drivers categorized as Economic, Demographic, Geographic, Institutional, or Cultural, with strength and direction
- **Narrative** — An interpretive lens threading events/forces together; tracks `omissions` (what it ignores) cross-referenced against other narratives
- **Gap** — Explicitly identified unknowns with impact assessment and resolution paths

Relationships: `PRECEDES` (Event→Event), `INFLUENCES` (Force→Event), `CONTRADICTS` (Narrative→Narrative), `SUPPORTS` (Evidence→Assertion)

### UI Flow: The Flashcard Architecture

Mobile-first, gesture-driven navigation across 5 screens:

```
P0 (Entry) → P1 (Summary Card)
                ├── Swipe Left  → P1L (Narrative A: vertical timeline graph)
                ├── Swipe Right → P1R (Narrative B: vertical timeline graph)
                └── Scroll Down → P2  (Deep Dive Chat)
```

- **P0**: Minimalist search (text/URL/audio input) + "I'm Feeling Lucky" + history drawer
- **P1**: Full-screen flashcard with summary image and neutral text
- **P1L/P1R**: Interactive story graphs with 3-level node reveal (Glance → Context → Evidence)
- **P2**: Contextual chat grounded in the narrative graph data

### Design System (Warm Editorial)

| Token | Value |
|-------|-------|
| Background | `#FAF7F2` (cream/ivory) |
| Text | `#2C2C2C` (dark charcoal) |
| Event nodes | Burnt sienna |
| Force nodes | Slate blue |
| Narrative nodes | Deep plum |
| Headings | Playfair Display / Georgia (serif) |
| Body | Source Serif Pro / Georgia (serif) |

## Key Design Documents

- `narrative_lab_blueprint.md` — Consolidated architecture and UX decisions
- `docs/design/narrative_schema.md` — Full data model specification with examples
- `docs/design/ui_interaction_design.md` — Detailed screen-by-screen UX flow
- `docs/design/walkthrough.md` — Wireframe walkthrough with design tokens and navigation map
- `docs/design/tech_and_ai.md` — Tech stack rationale and storage strategy
- `docs/design/implementation_plan.md` — MVP roadmap and brainstorming notes
- `docs/wireframes/` — PNG wireframes for all screens (P0, P1, P1L, P1R, P2)

## MVP Scope

Phase 1 focuses on manually curated data and nailing the P0→P2 UI experience. AI orchestration (extraction, contextualization, narrative modeling, gap detection) is **postponed** until the interaction paradigm is validated.
