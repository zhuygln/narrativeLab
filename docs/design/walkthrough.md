# Narrative Lab — Wireframe Walkthrough (v2: Editorial Style)

Warm & editorial aesthetic — cream backgrounds, serif typography, muted earth-tone palette (burnt sienna, slate blue, deep plum).

---

## Navigation Map
```mermaid
graph LR
    P0["P0: Entry"] -->|Submit| P1["P1: Summary"]
    P0 -->|Lucky| P1
    P1 -->|Swipe Left| P1L["P1L: Narrative A"]
    P1 -->|Swipe Right| P1R["P1R: Narrative B"]
    P1 -->|Scroll Down| P2["P2: Chat"]
    P2 -->|Scroll Up| P1
    P1 -->|Scroll Up| P0
    P1L -->|Swipe Right| P1
    P1R -->|Swipe Left| P1
```

---

## Screen Wireframes

````carousel
### P0 — Entry
![P0 Entry](/Users/yonglinzhu/research/narrativeLab/docs/wireframes/wireframe_p0_v2_1772227272595.png)
- Minimalist Google-style layout on cream background
- Serif logo, single search input (text/link/audio), Submit + I'm Feeling Lucky
- History icon top-right
<!-- slide -->
### P1 — Summary Card
![P1 Summary](/Users/yonglinzhu/research/narrativeLab/docs/wireframes/wireframe_p1_v2_1772227285744.png)
- Full-screen flashcard with sepia-toned image
- Bold serif headline + neutral summary text
- Navigation: ← Narrative A | ↓ Deep Dive | Narrative B →
<!-- slide -->
### P1L — Narrative A: The Security Dilemma
![P1L Narrative A](/Users/yonglinzhu/research/narrativeLab/docs/wireframes/wireframe_p1l_v3_1772228815230.png)
- Story Graph with a clear vertical **timeline flow** (top to bottom)
- Nodes branch off the central time axis
- Swipe right → back to P1
<!-- slide -->
### P1R — Narrative B: Economic Competition
![P1R Narrative B](/Users/yonglinzhu/research/narrativeLab/docs/wireframes/wireframe_p1r_v3_1772228826741.png)
- Story Graph with a clear horizontal **timeline flow** (left to right)
- Different narrative framing of the same events along the time axis
- Swipe left → back to P1
<!-- slide -->
### P2 — Deep Dive Chat
![P2 Chat](/Users/yonglinzhu/research/narrativeLab/docs/wireframes/wireframe_p2_v2_1772227321380.png)
- Warm chat UI with serif typography
- Structured, evidence-backed AI responses
- Scroll up → back to P1
````

---

## Design Tokens
| Token | Value |
|-------|-------|
| Background | `#FAF7F2` (cream/ivory) |
| Text | `#2C2C2C` (dark charcoal) |
| Events (nodes) | Burnt sienna |
| Forces (nodes) | Slate blue |
| Narratives (nodes) | Deep plum |
| Headings | Serif (Playfair Display / Georgia) |
| Body | Serif (Source Serif Pro / Georgia) |
