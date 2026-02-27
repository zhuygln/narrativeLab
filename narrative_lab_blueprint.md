# Narrative Lab: Architecture & UX Blueprint

This document consolidates all the design decisions and architectural choices made during the initial brainstorming phase.

---

## 1. Project Vision
**Narrative Lab** aims to transform reactive news consumption into structured, contextual understanding. 
The core philosophy is: **"Context before conclusion."** 

By treating news stories as systems driven by structural forces, the project seeks to reduce misinterpretation and highlight missing information.

---

## 2. The Narrative Schema (Data Model)
Our "Story Graph Engine" is built on the following ontology:

### `Event` (The Atomic Fact)
- `id`: UUID
- `timestamp`: ISO8601
- `title`: Short label for the graph dot.
- `summary_short`: Single-sentence overview (hover state).
- `summary_expanded`: Detailed context (click/panel state).
- `source_url`: Link to original evidence.

### `Structural Force` (The Context)
- `category`: (Economic, Demographic, Geographic, Institutional, Cultural)
- `strength`: Magnitude of influence.
- `direction`: Vector of change.

### `Narrative` (The Lens)
- `label`: Overarching interpretive frame (e.g., "The Security Dilemma").
- `omissions`: What this narrative ignores relative to others.

### `Gap` (The Unknowns)
- What is explicitly missing from coverage?

### Relationships
- `PRECEDES` (Event -> Event)
- `INFLUENCES` (Force -> Event)
- `CONTRADICTS` (Narrative -> Narrative)
- `SUPPORTS` (Evidence -> Assertion)

---

## 3. The Flashcard Experience (UI/UX Flow)

The core interaction is a mobile-first, gesture-driven flow designed for rapid perspective shifting.

### P0 (Entry Point)
- **Aesthetic**: Minimalist Google-style layout.
- **Input**: Accepts text, URL, or audio to start an inquiry.
- **Actions**: "Submit" or "I'm Feeling Lucky".
- **History**: Drawer available to retrieve past sessions.

### P1 (The Hook / Summary Card)
- **Visual**: Full-screen flashcard covering the event in broad, neutral strokes.
- **Content**: Cinematic summary image + concise body text.
- **Navigation Options**:
  - Swipe Up: Return to P0.
  - Swipe Left/Right: Open alternative narratives (P1L / P1R).
  - Scroll Down: Enter Deep Dive Chat (P2).

### P1L & P1R (Perspective Shift / Story Graphs)
- **Concept**: Swiping left or right reveals completely different, competing organizational frames of the same event.
- **Interaction**: Fully interactive **Story Graphs**. 
  - **P1L**: Vertical Timeline Flow (top to bottom).
  - **P1R**: Horizontal Timeline Flow (left to right).
- Graph nodes (Events, Forces) trigger the 3-level reveal (Title -> Summary -> Source Link) when tapped.

### P2 (Deep Dive Chat)
- A contextual chat interface (similar to ChatGPT) where the user asks contextual follow-up questions explicitly grounded in the data structure defined in P1.

### Design System (Warm Editorial)
- **Background**: Cream / Ivory (`#FAF7F2`).
- **Typography**: Serif headlines (Playfair Display / Georgia), Serif body text.
- **Graph Nodes**: Earth-tones (Burnt Sienna for Events, Slate Blue for Forces, Deep Plum for Narratives).

---

## 4. Technical Architecture

### Tech Stack
- **Platform**: Responsive Web App (Next.js App Router). 
  - *Note: Designed mobile-first. Can be wrapped as PWA or via Capacitor later for native iOS/Android.*
- **Graph Visualization**: `React Flow` or `D3.js` for the interactive P1L/P1R story timelines.
- **Styling**: Vanilla CSS + Framer Motion (for smooth swipe transitions).

### Storage Strategy
- **Relational/Graph Storage**: Postgres (Supabase) to store the relationships between Events and Forces, along with the tiered strings (`summary_short`, `summary_expanded`, `source_url`).
- **Vector Storage**: For semantic search and storing larger chunks of evidence (via pgvector).

### [POSTPONED] AI Orchestration Pipeline
*Note: AI agent workflows (Extraction, Contextualization, Narrative Modeling, Gap Detection) are postponed for the MVP. We will focus strictly on manual curation of the data model and nailing the P0-P2 UI experience first.*
