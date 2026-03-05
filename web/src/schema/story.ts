export type NodeType = 'event' | 'actor' | 'claim' | 'policy' | 'metric' | 'evidence';

export type Lane = 'Policy' | 'Market' | 'Tech' | 'Society' | 'Info Ops' | 'Context';

export interface Source {
    url: string;
    publisher: string;
    date: string;
    quote_snippet?: string;
    reliability?: 'high' | 'medium' | 'low';
}

export interface Node {
    id: string;
    type: NodeType;
    title: string;
    date?: string; // ISO format (YYYY-MM-DD), primarily for timeline nodes
    summary: string;
    lane?: Lane;
    sources: Source[];
    confidence?: number; // 0-1
}

export type RelationType =
    | 'causes'
    | 'enables'
    | 'reacts_to'
    | 'contradicts'
    | 'funds'
    | 'benefits'
    | 'frames';

export interface Edge {
    id: string; // e.g. "sourceId-targetId-relation"
    source: string; // source Node ID
    target: string; // target Node ID
    relation: RelationType;
    strength?: number; // 0-1
    evidence_ids?: string[]; // IDs of sources supporting the edge
}

export interface Story {
    id: string;
    title: string;
    description: string;
    nodes: Node[];
    edges: Edge[];
}
