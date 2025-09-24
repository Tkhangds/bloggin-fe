import { GetTopTagResponseDto } from "@/types/dtos/get-top-tag-response.dto";

export function TopicHeader({
  currentTopic,
}: {
  currentTopic?: GetTopTagResponseDto;
}) {
  return (
    <div className="text-center">
      <h1 className="w-full py-5 text-center text-5xl font-bold">
        {currentTopic?.name}
      </h1>
      <div className="pb-2 text-muted-foreground">
        <span>Topic</span>

        <span className="mx-2">•</span>
        <span>{currentTopic?.postCount} stories</span>
      </div>
    </div>
  );
}
