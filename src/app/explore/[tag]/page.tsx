import { RecommendedWriters } from "@/components/explore/reccomend-writer";
import { StoryList } from "@/components/explore/story-list";

export default function ExplorePage({
  params,
}: {
  params: { tag: string };
}): JSX.Element {
  return (
    <div className="flex w-full flex-col items-center justify-start py-4">
      <RecommendedWriters tag={params.tag} />
      <StoryList tag={params.tag} />
    </div>
  );
}
