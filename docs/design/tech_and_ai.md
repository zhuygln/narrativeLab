# Tech Stack & AI Workflow Proposal

## 1. Platform & Stack Choice
> **User Question**: Is this for web or iOS?
**Recommendation**: I recommend starting with a **Responsive Web App (Next.js)**. 
- **Why?** Graphs and complex data visualizations (like the "connected dots") are often easier to build and prototype using web libraries (D3.js, React Flow). 
- **Future-Proofing**: We can use **Capacitor** or build a **PWA** if we want it to feel like a native iOS app later. Or, if you prefer a native-first experience, we could look at **SwiftUI + ForceDirectedGraph**. 

**Current MVP Stack (Web)**:
- **Frontend**: Next.js + React Flow (easy "connected dots" interaction).
- **Styling**: Vanilla CSS + [Framer Motion](https://www.framer.com/motion/) (for smooth transitions).
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL + Vector Search via pgvector).
- **Graph Visualization**: [Cytoscape.js](https://js.cytoscape.org/) or [D3.js](https://d3js.org/) for more complex narrative graphs.

## 2. LLM Orchestration Workflow
### Phase A-D: [POSTPONED]
Following user feedback, the AI orchestration is on hold while we focus on the UI and Data Model.

## 3. Storage Strategy: Graph + Vector
To support the "connected dots" with tiered summaries:
- **Relational/Graph Storage**: 
  - Each `Event` node stores `summary_short` (for immediate hover/click).
  - `summary_expanded` can be fetched on demand (for a side-panel view).
  - `source_url` is a direct property for the Level 3 interaction.
- **Vector**: Store chunks of evidence and news articles for semantic search and pattern matching.
