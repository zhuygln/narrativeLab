# Brainstorming Plan: Narrative Lab

Narrative Lab aims to provide "Context before Conclusion" by reconstructing the forces behind news stories. This plan outlines the areas we will brainstorm to move from vision to implementation.

## 1. Narrative Schema (The "Source of Truth")
We need to define the underlying data structure for a "reconstructed narrative".
- **Events**: Atomic occurrences with timestamps, locations, and actors.
- **Structural Forces**: Long-term trends (economic, demographic, geographic) that constrain or drive events.
- **Narratives**: Different interpretations or "frames" of the same event set.
- **Gaps**: Explicitly identified missing information or "unknown unknowns".
- **Causal Links**: Connections representing influence, not just temporal sequence.

## 2. Technical Architecture
How do we build the "Narrative Graph Engine"?
- **Backend**: Knowledge graph (e.g., Neo4j or RDF-based) vs. Relational (PostgreSQL with JSONB).
- **Data Ingestion**: RSS feeds, API integrations (NewsAPI, Perplexity, etc.).
- **Vector Database**: For RAG-based context retrieval and historical similarity search (e.g., Pinecone, Weaviate, or Chroma).

## 3. [POSTPONED] The AI Reconstruction Pipeline
(Focusing on manual curation and UI/UX first as per user feedback).

## 4. UI/UX: The Flashcard Architecture
The core interaction is a mobile-first, gesture-driven flow:
- **P0 (Entry)**: Minimalist Google-like search (Text, Link, Audio) + "I'm feeling lucky" + History.
- **P1 (Summary)**: Full-screen card with Summary Image and Text.
- **P1L / P1R (Narratives)**: Swipe left/right for alternative framings, each featuring a fully interactive "Connected Dots" Story Graph oriented as a vertical top-to-bottom timeline.
- **P2 (Deep Dive)**: Scroll down to a dedicated Chatbox to ask questions about the current story.

## 5. MVP Roadmap
- **Week 1-2**: Manual "Reconstruction" of one major story (e.g., current geopolitical event) to refine the schema.
- **Week 3-4**: Simple web interface (Vite/Next.js) to display the manually curated reconstruction.
- **Week 5+**: Automating the "Extraction" and "Gap Detection" steps.

---
**Next Steps**: I will provide detailed breakdowns for each of these sections and ask for your feedback.
