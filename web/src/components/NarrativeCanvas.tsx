'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Story, Node } from '@/schema/story';

interface NarrativeCanvasProps {
    story: Story;
    onNodeSelect: (node: Node) => void;
    selectedNodeId?: string;
    direction?: 'horizontal' | 'vertical';
}

export default function NarrativeCanvas({ story, onNodeSelect, selectedNodeId, direction = 'vertical' }: NarrativeCanvasProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
    const margin = direction === 'vertical'
        ? { top: 60, right: 20, bottom: 60, left: 20 }
        : { top: 40, right: 60, bottom: 40, left: 100 };

    useEffect(() => {
        if (containerRef.current) {
            // Use a minimum reasonable height or width for the graph depending on orientation
            const rect = containerRef.current.getBoundingClientRect();
            setDimensions({
                width: Math.max(rect.width, direction === 'horizontal' ? 800 : 300),
                height: Math.max(rect.height, direction === 'vertical' ? 800 : 500)
            });
        }
    }, [direction]);

    useEffect(() => {
        if (!svgRef.current || !story) return;

        const { width, height } = dimensions;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous render

        // Apply Ivory background explicitly to SVG space as well if desired, but container handles it
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // 1. Scales
        const timelineNodes = story.nodes.filter(n => n.date);
        const dateExtent = d3.extent(timelineNodes, n => new Date(n.date as string));

        const minDate = dateExtent[0] || new Date();
        const maxDate = dateExtent[1] || new Date();

        const paddingTime = (maxDate.getTime() - minDate.getTime()) * 0.1 || 30 * 24 * 60 * 60 * 1000;

        // Primary Domain Length
        const primaryDomain = [new Date(minDate.getTime() - paddingTime), new Date(maxDate.getTime() + paddingTime)];

        const timeScale = d3.scaleTime()
            .domain(primaryDomain)
            .range(direction === 'vertical' ? [0, innerHeight] : [0, innerWidth]);

        // Distinct lanes
        const availableLanes = Array.from(new Set(story.nodes.map(n => n.lane || 'Context')));
        const laneScale = d3.scalePoint()
            .domain(availableLanes)
            .range(direction === 'vertical' ? [0, innerWidth] : [0, innerHeight])
            .padding(0.5);

        // 2. Axes and Background Lanes
        availableLanes.forEach(lane => {
            const p = laneScale(lane);
            if (p === undefined) return;

            // Lane separator line & labels based on direction
            if (direction === 'vertical') {
                g.append('line')
                    .attr('x1', p)
                    .attr('x2', p)
                    .attr('y1', 0)
                    .attr('y2', innerHeight)
                    .attr('stroke', '#E5E7EB') // subtle gray
                    .attr('stroke-dasharray', '4,4')
                    .attr('stroke-width', 1);

                g.append('text')
                    .attr('x', p)
                    .attr('y', -20)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '11px')
                    .attr('font-weight', 'bold')
                    .attr('font-family', 'var(--font-inter)')
                    .attr('text-transform', 'uppercase')
                    .attr('letter-spacing', '0.05em')
                    .attr('fill', '#9CA3AF') // slate-400
                    .text(lane);
            } else {
                g.append('line')
                    .attr('x1', 0)
                    .attr('x2', innerWidth)
                    .attr('y1', p)
                    .attr('y2', p)
                    .attr('stroke', '#E5E7EB')
                    .attr('stroke-dasharray', '4,4')
                    .attr('stroke-width', 1);

                g.append('text')
                    .attr('x', -10)
                    .attr('y', p)
                    .attr('text-anchor', 'end')
                    .attr('alignment-baseline', 'middle')
                    .attr('font-size', '11px')
                    .attr('font-weight', 'bold')
                    .attr('font-family', 'var(--font-inter)')
                    .attr('text-transform', 'uppercase')
                    .attr('letter-spacing', '0.05em')
                    .attr('fill', '#9CA3AF')
                    .text(lane);
            }
        });

        // Time Axis (Hide for stylistic MVP, or keep extremely minimal)
        const timeAxis = direction === 'vertical'
            ? d3.axisLeft(timeScale).ticks(5)
            : d3.axisBottom(timeScale).ticks(5);

        const timeAxisG = g.append('g')
            .attr('transform', direction === 'vertical' ? `translate(0,0)` : `translate(0,${innerHeight})`)
            .call(timeAxis)

        timeAxisG.selectAll('text')
            .attr('fill', '#9CA3AF')
            .attr('font-family', 'var(--font-inter)')
            .attr('font-size', '10px');

        timeAxisG.selectAll('.domain').attr('stroke', 'none');
        timeAxisG.selectAll('.tick line').attr('stroke', '#E5E7EB');

        // 3. Position Calculation
        const nodePositions = new Map<string, { x: number, y: number }>();

        story.nodes.forEach((node, i) => {
            let x = innerWidth / 2;
            let y = innerHeight / 2;

            const timePos = node.date ? timeScale(new Date(node.date)) : (direction === 'vertical' ? (innerHeight / (story.nodes.length + 1)) * (i + 1) : (innerWidth / (story.nodes.length + 1)) * (i + 1));
            const lanePos = laneScale(node.lane || 'Context') || (direction === 'vertical' ? innerWidth / 2 : innerHeight / 2);

            if (direction === 'vertical') {
                x = lanePos;
                y = timePos;
            } else {
                y = lanePos;
                x = timePos;
            }

            nodePositions.set(node.id, { x, y });
        });

        // 4. Edges
        g.selectAll('.edge')
            .data(story.edges)
            .enter()
            .append('path')
            .attr('class', 'edge')
            .attr('d', (d) => {
                const sourcePos = nodePositions.get(d.source);
                const targetPos = nodePositions.get(d.target);
                if (!sourcePos || !targetPos) return null;

                const dx = targetPos.x - sourcePos.x;
                const dy = targetPos.y - sourcePos.y;
                const dr = Math.sqrt(dx * dx + dy * dy);

                return `M${sourcePos.x},${sourcePos.y}A${dr},${dr} 0 0,1 ${targetPos.x},${targetPos.y}`;
            })
            .attr('fill', 'none')
            .attr('stroke', '#D1D5DB') // slate-300
            .attr('stroke-width', 2)
            .attr('marker-end', 'url(#arrowhead)');

        svg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "-0 -5 10 10")
            .attr("refX", 18)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 4)
            .attr("markerHeight", 4)
            .attr("xoverflow", "visible")
            .append("svg:path")
            .attr("d", "M 0,-5 L 10 ,0 L 0,5")
            .attr("fill", "#9CA3AF")
            .style("stroke", "none");

        // 5. Nodes
        const nodeGroups = g.selectAll('.node')
            .data(story.nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => {
                const pos = nodePositions.get(d.id);
                return pos ? `translate(${pos.x},${pos.y})` : '';
            })
            .style('cursor', 'pointer')
            .on('click', (event, d) => onNodeSelect(d));

        // Warm Editorial Colors 
        const getTypeColor = (type: string) => {
            switch (type) {
                case 'event': return '#E97451'; // Burnt Sienna
                case 'actor': return '#10B981'; // Earthy Emerald
                case 'claim': return '#F59E0B'; // Amber
                case 'policy': return '#6A5ACD'; // Slate Blue
                case 'evidence': return '#673147'; // Deep Plum
                default: return '#64748b'; // Slate
            }
        };

        nodeGroups.append('circle')
            .attr('r', 10)
            .attr('fill', (d) => d.id === selectedNodeId ? '#FAF7F2' : getTypeColor(d.type))
            .attr('stroke', (d) => d.id === selectedNodeId ? '#1F2937' : '#FAF7F2')
            .attr('stroke-width', 3)
            .style('transition', 'all 0.2s ease-in-out')
            .style('filter', d => d.id === selectedNodeId ? 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))' : 'drop-shadow(0px 2px 4px rgba(0,0,0,0.05))');

        nodeGroups.append('text')
            .attr('y', 22)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('font-family', 'var(--font-playfair)')
            .attr('font-weight', d => d.id === selectedNodeId ? 'bold' : 'normal')
            .attr('fill', '#1F2937') // slate-800
            .text(d => d.title.length > 25 ? d.title.substring(0, 23) + '...' : d.title);

    }, [story, dimensions, selectedNodeId, onNodeSelect, direction]);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[500px] bg-ivory overflow-y-auto overflow-x-hidden">
            <svg ref={svgRef} className={direction === 'vertical' ? "w-full min-h-[800px]" : "min-w-[800px] h-full"} />
        </div>
    );
}
