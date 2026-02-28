# UI/UX Design: The Narrative Flashcard Flow

The primary user experience is designed as a mobile-first, highly fluid "flashcard" interface that encourages exploration of different narratives through intuitive swiping gestures.

## Core Flow Architecture

### P0: The Entry Point (Minimalist Search)
- **Aesthetic**: Minimalist, similar to the Google homepage. High contrast, clean typography.
- **Main Interaction**: A central input field that accepts:
  - Text description of an event.
  - A URL link to a news article.
  - Audio input (voice search).
- **Secondary Actions**:
  - `[I'm Feeling Lucky]`: A prominent button to load the "Story of the Day" or "Story of the Week".
  - **History Panel**: A foldable hamburger menu or icon at the top corner to retrieve past chat sessions and explored stories.

### P1: The Main Summary (The Hook)
*Triggered upon submitting a query from P0.*
- **Visual**: A visually striking "flashcard" occupying the full screen.
- **Content**:
  - A definitive **Summary Image**.
  - **Summary Text**: A concise, neutral overview of the event.
- **Navigation**:
  - **Swipe Up / Scroll Up**: Returns to P0.
  - **Swipe Left / Right**: Accesses alternative narratives (P1L / P1R).
  - **Swipe Down / Scroll Down**: Enters the deep-dive chat mode (P2).

### P1L & P1R: Alternative Narratives (The Perspective Shift)
*Accessed by swiping left or right from P1.*
- **Concept**: Each swipe reveals a completely different framing or accepted narrative regarding the central event.
- **Visual**: Another full-screen flashcard.
- **Content**:
  - Highlights the specific narrative's perspective.
  - **Interactive Story Graph (Vertical Timeline)**: A fully interactive visual map (built with a library like React Flow) that flows from top to bottom. Users can tap/click on individual dots (Events, Forces, Evidence) to trigger the "3-level reveal" (Glance -> Context -> Evidence) and see the relationships that support *this* specific narrative.
- **Navigation** (P1L, P1, and P1R form a horizontal row connected by left/right swipes):
  - **Swipe Up**: Returns to P0.
  - **Swipe Down**: Enters the deep-dive chat mode (P2).
  - **P1L — Swipe Right**: Returns to P1.
  - **P1R — Swipe Left**: Returns to P1.

### P2: The Deep Dive (Contextual Chat)
*Accessed by swiping down from P1, P1L, or P1R.*
- **Concept**: A dedicated chat interface anchored to the specific story explored in P1.
- **Interaction**: Users can ask contextual questions ("Why did actor X do this?", "What happened previously?"). The AI responds using the constructed narrative graph as ground truth.
- **Continuity**: This session is saved and can be accessed later via the history menu on P0.

## Interaction Paradigms
- **Flashcard Physics**: Transitions between P0, P1, and P1L/R should feel snappy, with spring-like physics typical of modern mobile OS cards (e.g., iOS app switcher or TikTok feed).
- **The "Story Graph" Integration**: On P1L and P1R, the graph should be scaled appropriately for a mobile screen, emphasizing the 3-level reveal (Glance -> Context -> Evidence) discussed previously for individual nodes.
