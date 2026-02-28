"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import type { Screen, Story } from "@/types/narrative";
import P0Entry from "./screens/P0Entry";
import P1Summary from "./screens/P1Summary";
import P1Narrative from "./screens/P1Narrative";
import P2Chat from "./screens/P2Chat";
import styles from "./SwipeNavigator.module.css";

const SWIPE_THRESHOLD = 60;

/** Map each screen to its neighbours in each swipe direction. */
const NAV_MAP: Record<Screen, Partial<Record<"up" | "down" | "left" | "right", Screen>>> = {
  P0: {},
  P1: { up: "P0", down: "P2", left: "P1L", right: "P1R" },
  P1L: { up: "P0", down: "P2", right: "P1", left: "P1R" },
  P1R: { up: "P0", down: "P2", left: "P1", right: "P1L" },
  P2: { up: "P1" },
};

/** Slide direction → motion variants */
function getVariants(direction: "up" | "down" | "left" | "right") {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "right" || direction === "down" ? -1 : 1;
  return {
    initial: { [axis]: `${sign * 100}%`, opacity: 0.6 },
    animate: { [axis]: 0, opacity: 1 },
    exit: { [axis]: `${-sign * 100}%`, opacity: 0.6 },
  };
}

interface SwipeNavigatorProps {
  story: Story;
}

export default function SwipeNavigator({ story }: SwipeNavigatorProps) {
  const [screen, setScreen] = useState<Screen>("P0");
  const [slideDir, setSlideDir] = useState<"up" | "down" | "left" | "right">("up");

  const navigateTo = useCallback(
    (target: Screen, dir: "up" | "down" | "left" | "right") => {
      setSlideDir(dir);
      setScreen(target);
    },
    []
  );

  const handlePanEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const { offset } = info;
      const absX = Math.abs(offset.x);
      const absY = Math.abs(offset.y);
      if (absX < SWIPE_THRESHOLD && absY < SWIPE_THRESHOLD) return;

      let dir: "up" | "down" | "left" | "right";
      if (absX > absY) {
        dir = offset.x > 0 ? "right" : "left";
      } else {
        dir = offset.y > 0 ? "down" : "up";
      }

      // Swipe direction is opposite: swiping left means content goes left → navigate right
      // But we map swipe gesture to semantic direction as in the design doc:
      // "Swipe Left → P1L" means the gesture is leftward
      const gestureDir = dir;
      // Invert: user swipes left = content slides right = we go to the "left" neighbour
      // The nav map already uses the design doc convention (swipe direction)
      const invertedDir: typeof dir =
        dir === "left" ? "left" : dir === "right" ? "right" : dir === "up" ? "up" : "down";

      const target = NAV_MAP[screen][invertedDir];
      if (target) {
        navigateTo(target, gestureDir);
      }
    },
    [screen, navigateTo]
  );

  // Handlers for P0 (non-gesture navigation)
  const handleSubmit = useCallback(
    (_query: string) => navigateTo("P1", "up"),
    [navigateTo]
  );
  const handleLucky = useCallback(
    () => navigateTo("P1", "up"),
    [navigateTo]
  );

  const variants = getVariants(slideDir);

  return (
    <div className={styles.viewport}>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          className={styles.page}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onPanEnd={screen !== "P0" ? handlePanEnd : undefined}
        >
          {screen === "P0" && (
            <P0Entry
              onSubmit={handleSubmit}
              onLucky={handleLucky}
              history={[{ id: story.id, title: story.title }]}
              onHistorySelect={() => navigateTo("P1", "up")}
            />
          )}
          {screen === "P1" && <P1Summary story={story} />}
          {screen === "P1L" && (
            <P1Narrative
              narrative={story.narratives[0]}
              events={story.events}
              forces={story.forces}
              gaps={story.gaps}
              relationships={story.relationships}
            />
          )}
          {screen === "P1R" && (
            <P1Narrative
              narrative={story.narratives[1]}
              events={story.events}
              forces={story.forces}
              gaps={story.gaps}
              relationships={story.relationships}
            />
          )}
          {screen === "P2" && <P2Chat story={story} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
