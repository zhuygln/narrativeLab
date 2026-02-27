# Narrative Lab: Brainstorming Synthesis Report

## Project Vision
**Narrative Lab** aims to transform reactive news consumption into structured, contextual understanding. The core philosophy is **"Context before conclusion."** By treating news stories as systems driven by structural forces, the project seeks to reduce misinterpretation and highlight missing information.

## Key Decisions & Artifacts

### 1. The Mobile-First "Flashcard" Architecture
The core user experience is a fluid, gesture-driven flow designed for rapid perspective shifting.
- **P0 (Entry Point)**: A minimalist Google-style interface accepting text, links, or audio. Includes an "I'm Feeling Lucky" option and a history drawer.
- **P1 (The Hook)**: A full-screen summary card with a definitive image and neutral text overview.
- **P1L & P1R (The Perspectives)**: Left/right swipes reveal alternative narratives. Each features an interactive "Connected Dots" Story Graph to explore the underlying evidence and structural forces.
- **P2 (The Deep Dive)**: Scrolling down from P1 opens an AI chatbox grounded in the story's context.
*Reference: [UI Interaction Design](ui_interaction_design.md)*

### 2. The Data Model (Narrative Schema)
We established a clear ontology to power the Story Graph:
- **Events**: The atomic facts (with short/expanded summaries and source links).
- **Structural Forces**: The underlying drivers (economic, demographic, etc.).
- **Narratives**: The overarching interpretive frames.
- **Gaps**: Explicitly identified missing context.
*Reference: [Narrative Schema](narrative_schema.md)*

### 3. Tech Stack & Implementation Strategy
- **Platform**: Responsive Web App (Next.js) optimized for mobile, allowing easy graph integration and future-proofing for iOS (PWA or Capacitor).
- **Storage**: Graph database for relationships + Vector database for semantic search and evidence chunks.
- **AI Orchestration**: Currently postponed to prioritize the core UI and manual curation of the data model.
*Reference: [Tech Stack & AI](tech_and_ai.md)*

## Next Steps
With the design phase crystallized, the immediate next steps are:
1. Initialize the Next.js repository.
2. Build the structural foundation for the mobile P0 and P1 UI.
3. Integrate an interactive graph library (e.g., React Flow) for the P1L/R perspective shifts.
