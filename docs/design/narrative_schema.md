# Narrative Schema (Implemented)

To build a "Narrative Graph Engine", we implemented an extensible data model in `web/schema/story.ts`. Here is the implemented schema:

## 1. The Core `Node` structure
- `id`: string
- `type`: `event | actor | claim | policy | metric | evidence`
- `title`: string
- `date`: Optional ISO format string (primary layout driver for timelines)
- `summary`: string
- `lane`: `Policy | Market | Tech | Society | Info Ops | Context`
- `sources`: Array of Source objects (url, publisher, date, quote_snippet)
- `confidence`: Optional number (0-1)

## 2. The Relationship `Edge`
- `id`: string
- `source`: string (Node ID)
- `target`: string (Node ID)
- `relation`: `causes | enables | reacts_to | contradicts | funds | benefits | frames`
- `strength`: Optional number (0-1)
- `evidence_ids`: Optional array of source IDs supporting the edge

## 3. The Encompassing `Story`
- `id`: string
- `title`: string
- `description`: string
- `nodes`: Array of Nodes
- `edges`: Array of Edges

---
### Example Mockup: The "Energy Transition" Story System
- **Event**: EU passes new carbon tax.
- **Structural Force**: Demographic shift (Aging population in EU requires more automated/efficient energy).
- **Narrative A**: "Green Sovereignty" (Focus on energy independence).
- **Narrative B**: "Deindustrialization Warning" (Focus on economic competitiveness).
- **Gap**: Long-term impact on global supply chains for raw minerals (often under-reported).
