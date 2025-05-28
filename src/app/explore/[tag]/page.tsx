import { RecommendedWriters } from "@/components/explore/reccomend-writer";
import { StoryList } from "@/components/explore/story-list";

export default function ExplorePage() {
  return (
    <div className="flex w-full flex-col items-center justify-start py-4">
      <RecommendedWriters />
      <StoryList />
    </div>
  );
}
