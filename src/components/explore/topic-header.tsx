import { GetTopTagResponseDto } from "@/types/dtos/get-top-tag-response.dto";

export function TopicHeader({
  currentTopic,
}: {
  currentTopic?: GetTopTagResponseDto;
}) {
  return (
    <div className="mb-12 text-center">
      <h1 className="mb-4 text-5xl font-bold">{currentTopic?.name}</h1>
      <div className="mb-6 text-muted-foreground">
        <span>Topic</span>

        <span className="mx-2">•</span>
        <span>{currentTopic?.postCount} stories</span>
      </div>
    </div>
  );
}
