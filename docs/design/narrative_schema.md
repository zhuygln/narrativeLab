# Narrative Schema Proposal

To build a "Narrative Graph Engine," we need an extensible data model. Here is a proposed schema:

## 1. The Atomic Unit: `Event`
- `id`: UUID
- `timestamp`: ISO8601
- `title`: Short label (for graph dot)
- `summary_short`: Single-sentence overview (Level 1)
- `summary_expanded`: Detailed context and analysis (Level 2)
- `source_url`: Link to original evidence (Level 3)
- `location`: GeoJSON or EntityID
- `actors`: List of EntityIDs
- `evidence`: List of links/references

## 2. The Contextual Layer: `Structural Force`
These are the "invisible hands" that drive events.
- `category`: (Economic, Demographic, Geographic, Institutional, Cultural)
- `strength`: (Magnitude of influence)
- `direction`: (The vector of change)
- `linked_events`: Events influenced by this force

## 3. The Interpretive Layer: `Narrative`
A narrative is a specific "threading" of events and forces.
- `label`: (e.g., "The Security Dilemma", "The Resource Scarcity Frame")
- `source_mapping`: Which outlets or actors promote this narrative?
- `key_assertions`: The logical claims central to this view.
- `omissions`: What this narrative ignores (automatically cross-referenced with other narratives).

## 4. The Meta Layer: `Gap`
- `description`: What do we not know yet?
- `impact`: How significant is this missing data for understanding the whole?
- `resolution_path`: What evidence would close this gap?

## 5. Relationships
- `PRECEDES` (Event -> Event)
- `INFLUENCES` (Force -> Event)
- `CONTRADICTS` (Narrative -> Narrative)
- `SUPPORTS` (Evidence -> Assertion)

---
### Example Mockup: The "Energy Transition" Story System
- **Event**: EU passes new carbon tax.
- **Structural Force**: Demographic shift (Aging population in EU requires more automated/efficient energy).
- **Narrative A**: "Green Sovereignty" (Focus on energy independence).
- **Narrative B**: "Deindustrialization Warning" (Focus on economic competitiveness).
- **Gap**: Long-term impact on global supply chains for raw minerals (often under-reported).
