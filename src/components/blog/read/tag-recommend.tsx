import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useStatistics } from "@/hooks/apis/useStatistics";
import { useRouter } from "next/navigation";
import { CardDescription } from "@/components/ui/card";

export default function TagRecommend(): JSX.Element {
  const { data, isLoading } = useStatistics().useGetTopTag(9);
  const router = useRouter();
  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h2 className="mb-4 text-lg font-bold">Topics to Follow</h2>
      <div className="flex flex-wrap gap-4">
        {!isLoading &&
          data &&
          data.map((topic, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer bg-white px-3 py-1 hover:bg-gray-100"
            >
              {topic.name} ({topic.postCount})
            </Badge>
          ))}
      </div>
      {data && data?.length > 0 ? (
        <Button
          variant="ghost"
          className="mt-4 w-full text-gray-500 hover:text-gray-700"
        >
          See More Authors
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <CardDescription className="flex w-full justify-center">
          No topics available
        </CardDescription>
      )}
    </div>
  );
}
