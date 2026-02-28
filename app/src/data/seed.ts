import type { Story } from "@/types/narrative";

/**
 * Manually curated seed story — "EU Carbon Border Tax"
 * Used to validate the P0→P2 UI flow before AI automation.
 */
export const seedStory: Story = {
  id: "story-eu-carbon-tax",
  title: "EU Carbon Border Tax Reshapes Global Trade",
  summary:
    "The European Union's Carbon Border Adjustment Mechanism (CBAM) is fundamentally altering international trade dynamics, forcing exporters worldwide to account for carbon emissions or face steep tariffs. Supporters call it a necessary climate measure; critics warn it could fragment global trade.",
  image_url: "/images/eu-carbon-tax.jpg",
  created_at: "2026-02-20T00:00:00Z",

  events: [
    {
      id: "evt-1",
      timestamp: "2023-10-01T00:00:00Z",
      title: "CBAM transitional phase begins",
      summary_short:
        "EU launches the reporting-only phase of its Carbon Border Adjustment Mechanism, requiring importers to declare embedded emissions.",
      summary_expanded:
        "On October 1 2023 the EU activated the transitional phase of CBAM, covering imports of cement, iron & steel, aluminium, fertilisers, electricity, and hydrogen. During this phase importers must report embedded emissions but do not yet pay a financial adjustment. The mechanism is designed to prevent 'carbon leakage' — the relocation of production to countries with weaker climate policies.",
      source_url: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
      actors: ["European Commission", "EU importers"],
    },
    {
      id: "evt-2",
      timestamp: "2025-01-01T00:00:00Z",
      title: "CBAM financial phase enters force",
      summary_short:
        "Importers must now purchase CBAM certificates reflecting the carbon price of embedded emissions in covered goods.",
      summary_expanded:
        "From January 2026 the full financial mechanism applies. Importers must buy CBAM certificates at a price linked to the EU Emissions Trading System (ETS) allowance price. The policy effectively extends EU carbon pricing to foreign producers, creating strong incentives for trading partners to adopt their own carbon pricing or invest in decarbonisation.",
      source_url: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
      actors: ["European Commission", "EU importers", "Global exporters"],
    },
    {
      id: "evt-3",
      timestamp: "2025-06-15T00:00:00Z",
      title: "India files WTO complaint against CBAM",
      summary_short:
        "India challenges the EU carbon border tax at the World Trade Organization, calling it a unilateral trade barrier.",
      summary_expanded:
        "India, one of the largest exporters of steel and aluminium to the EU, formally files a dispute at the WTO arguing that CBAM violates Most-Favoured-Nation principles by discriminating against countries without equivalent carbon pricing. The complaint intensifies a diplomatic stand-off between emerging economies and the EU over climate-trade linkages.",
      source_url: "https://www.wto.org/english/tratop_e/dispu_e/dispu_e.htm",
      actors: ["India", "WTO", "European Commission"],
    },
    {
      id: "evt-4",
      timestamp: "2025-11-10T00:00:00Z",
      title: "Turkey announces domestic carbon pricing",
      summary_short:
        "Turkey introduces a national ETS to avoid CBAM costs on its EU-bound exports.",
      summary_expanded:
        "Turkey, whose exports to the EU are heavily concentrated in steel and cement, announces a domestic emissions trading system with prices pegged near EU ETS levels. The move is widely interpreted as a direct response to CBAM — demonstrating the mechanism's power to 'export' EU climate policy. Several other countries begin feasibility studies for similar systems.",
      source_url: "https://icapcarbonaction.com/en/ets-map",
      actors: ["Turkey", "European Commission"],
    },
    {
      id: "evt-5",
      timestamp: "2026-02-01T00:00:00Z",
      title: "EU proposes extending CBAM to chemicals and plastics",
      summary_short:
        "European Commission publishes a draft regulation to expand CBAM coverage to organic chemicals and polymers by 2028.",
      summary_expanded:
        "Building on the initial rollout, the Commission proposes adding organic chemicals and plastics to the CBAM scope. The expansion would cover a significantly larger share of EU imports and affect major exporters in the US, China, and the Middle East. Industry groups warn of supply chain disruption; environmental organisations applaud the ambition.",
      source_url: "https://ec.europa.eu/commission/presscorner",
      actors: ["European Commission", "Chemical industry", "Environmental NGOs"],
    },
  ],

  forces: [
    {
      id: "force-1",
      label: "EU climate policy ratchet",
      category: "Institutional",
      strength: 0.9,
      direction: "Tightening emissions regulation",
      linked_events: ["evt-1", "evt-2", "evt-5"],
    },
    {
      id: "force-2",
      label: "Global trade fragmentation",
      category: "Economic",
      strength: 0.7,
      direction: "Increasing regionalization of supply chains",
      linked_events: ["evt-3", "evt-4"],
    },
    {
      id: "force-3",
      label: "Developing-economy industrialisation",
      category: "Demographic",
      strength: 0.6,
      direction: "Growing export dependency on carbon-intensive goods",
      linked_events: ["evt-3"],
    },
  ],

  narratives: [
    {
      id: "narr-a",
      label: "Green Sovereignty",
      source_mapping: ["European Commission", "Major EU environmental NGOs", "Nordic media"],
      key_assertions: [
        "CBAM is essential to prevent carbon leakage and level the playing field for EU industry.",
        "The mechanism incentivises global decarbonisation by 'exporting' carbon pricing.",
        "Turkey's response proves CBAM works as intended.",
      ],
      omissions: [
        "Disproportionate impact on developing economies with limited decarbonisation capacity.",
        "Risk of retaliatory trade measures fragmenting the global trading system.",
      ],
    },
    {
      id: "narr-b",
      label: "Neo-Protectionism",
      source_mapping: ["Indian government", "WTO developing-country bloc", "US industry lobbies"],
      key_assertions: [
        "CBAM is a unilateral trade barrier disguised as climate policy.",
        "It violates WTO non-discrimination principles.",
        "Emerging economies bear the cost of a problem created by historical emitters.",
      ],
      omissions: [
        "The genuine risk of carbon leakage that CBAM addresses.",
        "Developing countries' own rising absolute emissions trajectories.",
      ],
    },
  ],

  gaps: [
    {
      id: "gap-1",
      description: "Long-term impact on global supply chains for raw materials",
      impact: "Could reshape sourcing patterns for steel, aluminium, and chemicals for decades.",
      resolution_path:
        "Longitudinal trade-flow analysis comparing pre- and post-CBAM import patterns.",
    },
    {
      id: "gap-2",
      description: "Effectiveness of CBAM in actually reducing global emissions vs. shifting them",
      impact: "Determines whether the policy achieves its stated climate objective.",
      resolution_path:
        "Independent lifecycle emissions audits of goods redirected away from EU markets.",
    },
  ],

  relationships: [
    { id: "rel-1", type: "PRECEDES", source_id: "evt-1", target_id: "evt-2" },
    { id: "rel-2", type: "PRECEDES", source_id: "evt-2", target_id: "evt-3" },
    { id: "rel-3", type: "PRECEDES", source_id: "evt-2", target_id: "evt-4" },
    { id: "rel-4", type: "PRECEDES", source_id: "evt-4", target_id: "evt-5" },
    { id: "rel-5", type: "INFLUENCES", source_id: "force-1", target_id: "evt-1" },
    { id: "rel-6", type: "INFLUENCES", source_id: "force-1", target_id: "evt-2" },
    { id: "rel-7", type: "INFLUENCES", source_id: "force-1", target_id: "evt-5" },
    { id: "rel-8", type: "INFLUENCES", source_id: "force-2", target_id: "evt-3" },
    { id: "rel-9", type: "INFLUENCES", source_id: "force-2", target_id: "evt-4" },
    { id: "rel-10", type: "INFLUENCES", source_id: "force-3", target_id: "evt-3" },
    { id: "rel-11", type: "CONTRADICTS", source_id: "narr-a", target_id: "narr-b" },
  ],
};
