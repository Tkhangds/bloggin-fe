import { TopicList } from "@/components/explore/topic-list";
import { TopicHeader } from "@/components/explore/topic-header";
import { StoryList } from "@/components/explore/story-list";

export default function ExplorePage() {
  return (
    <div className="flex w-full flex-col">
      <TopicList />
      <TopicHeader />
      <StoryList />
    </div>
  );
}
