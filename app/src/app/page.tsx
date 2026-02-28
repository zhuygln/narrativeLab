import SwipeNavigator from "@/components/SwipeNavigator";
import { seedStory } from "@/data/seed";

export default function Home() {
  return <SwipeNavigator story={seedStory} />;
}
