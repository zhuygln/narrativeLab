'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import P0_Search from '@/components/P0_Search';
import P1_Summary from '@/components/P1_Summary';
import P2_Chat from '@/components/P2_Chat';
import NarrativeCanvas from '@/components/NarrativeCanvas';
import NodeDetailsSheet from '@/components/NodeDetailsSheet';
import { Story, Node } from '@/schema/story';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import sampleStoryData from '@/data/sample_story.json';

const story: Story = sampleStoryData as Story;

type ViewState = 'P0' | 'P1' | 'P1L' | 'P1R' | 'P2';

export default function AppOrchestrator() {
  const [currentView, setCurrentView] = useState<ViewState>('P0');
  const [direction, setDirection] = useState({ x: 0, y: 0 });

  // State for the NodeDetails bottom sheet
  const [selectedNode, setSelectedNode] = useState<Node | undefined>(undefined);

  const navigateTo = (view: ViewState) => {
    let dx = 0; let dy = 0;

    if (view === 'P1') {
      if (currentView === 'P0') dy = 1;
      if (currentView === 'P2') dy = -1;
      if (currentView === 'P1L') dx = 1;
      if (currentView === 'P1R') dx = -1;
    } else if (view === 'P0') {
      dy = -1;
    } else if (view === 'P2') {
      dy = 1;
    } else if (view === 'P1L') {
      dx = -1;
    } else if (view === 'P1R') {
      dx = 1;
    }

    setDirection({ x: dx, y: dy });
    setCurrentView(view);
    setSelectedNode(undefined); // Close sheet on view change
  };

  const handleNodeSelect = (node: Node) => {
    if (selectedNode?.id === node.id) {
      setSelectedNode(undefined);
    } else {
      setSelectedNode(node);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedNode) return; // Disable swipe keys if sheet is open

      if (currentView === 'P1') {
        if (e.key === 'ArrowUp') navigateTo('P0');
        if (e.key === 'ArrowDown') navigateTo('P2');
        if (e.key === 'ArrowLeft') navigateTo('P1L');
        if (e.key === 'ArrowRight') navigateTo('P1R');
      } else if (currentView === 'P1L' && e.key === 'ArrowRight') {
        navigateTo('P1');
      } else if (currentView === 'P1R' && e.key === 'ArrowLeft') {
        navigateTo('P1');
      } else if (currentView === 'P2' && e.key === 'ArrowUp') {
        navigateTo('P1');
      } else if (currentView === 'P0' && e.key === 'ArrowDown') {
        navigateTo('P1');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, selectedNode]);

  const variants = {
    enter: (dir: { x: number; y: number }) => {
      return {
        x: dir.x > 0 ? 1000 : dir.x < 0 ? -1000 : 0,
        y: dir.y > 0 ? 1000 : dir.y < 0 ? -1000 : 0,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: (dir: { x: number; y: number }) => {
      return {
        zIndex: 0,
        x: dir.x < 0 ? 1000 : dir.x > 0 ? -1000 : 0,
        y: dir.y < 0 ? 1000 : dir.y > 0 ? -1000 : 0,
        opacity: 0,
      };
    },
  };

  return (
    <div className="w-full h-[100dvh] overflow-hidden bg-[#FAF7F2] relative font-sans">
      <AnimatePresence initial={false} custom={direction}>

        {currentView === 'P0' && (
          <motion.div
            key="P0"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <P0_Search onSearch={() => navigateTo('P1')} />
          </motion.div>
        )}

        {currentView === 'P1' && (
          <motion.div
            key="P1"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <P1_Summary
              story={story}
              onSwipeUp={() => navigateTo('P0')}
              onSwipeDown={() => navigateTo('P2')}
              onSwipeLeft={() => navigateTo('P1L')}
              onSwipeRight={() => navigateTo('P1R')}
            />
          </motion.div>
        )}

        {currentView === 'P1L' && (
          <motion.div
            key="P1L"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 bg-[#FAF7F2] flex flex-col"
          >
            <div className="flex-none p-6 pt-12 flex justify-between items-center z-10 bg-gradient-to-b from-[#FAF7F2] to-transparent">
              <div>
                <h2 className="text-3xl font-bold font-playfair text-[#673147] tracking-tight">Narrative A</h2>
                <p className="font-sans text-xs text-slate-500 uppercase tracking-widest mt-1">Vertical Timeline</p>
              </div>
              <button onClick={() => navigateTo('P1')} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition px-3 py-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-widest">Back</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex-1 w-full relative -mt-10">
              <NarrativeCanvas
                story={story}
                direction="vertical"
                onNodeSelect={handleNodeSelect}
                selectedNodeId={selectedNode?.id}
              />
            </div>
          </motion.div>
        )}

        {currentView === 'P1R' && (
          <motion.div
            key="P1R"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 bg-[#FAF7F2] flex flex-col"
          >
            <div className="flex-none p-6 pt-12 flex justify-between items-center z-10 bg-gradient-to-b from-[#FAF7F2] to-transparent">
              <button onClick={() => navigateTo('P1')} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition px-3 py-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm border border-slate-200">
                <ChevronLeft size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Back</span>
              </button>
              <div className="text-right">
                <h2 className="text-3xl font-bold font-playfair text-[#6A5ACD] tracking-tight">Narrative B</h2>
                <p className="font-sans text-xs text-slate-500 uppercase tracking-widest mt-1">Horizontal Flow</p>
              </div>
            </div>

            <div className="flex-1 w-full relative -mt-10 overflow-x-auto">
              <NarrativeCanvas
                story={story}
                direction="horizontal"
                onNodeSelect={handleNodeSelect}
                selectedNodeId={selectedNode?.id}
              />
            </div>
          </motion.div>
        )}

        {currentView === 'P2' && (
          <motion.div
            key="P2"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <P2_Chat story={story} onSwipeUp={() => navigateTo('P1')} />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Bottom Sheet for Node Details */}
      <NodeDetailsSheet
        node={selectedNode}
        onClose={() => setSelectedNode(undefined)}
      />
    </div>
  );
}
