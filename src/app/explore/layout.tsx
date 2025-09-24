"use client";
import { TopicHeader } from "@/components/explore/topic-header";
import { TopicList } from "@/components/explore/topic-list";
import { LandingHeaderLayout } from "@/components/layouts/landing-header";
import { useStatistics } from "@/hooks/apis/useStatistics";
import { GetTopTagResponseDto } from "@/types/dtos/get-top-tag-response.dto";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useStatistics().useGetTopTag(20);
  const [currentTopic, setCurrentTopic] = useState<GetTopTagResponseDto>();
  const router = useRouter();
  const param = useParams<{ tag?: string }>();

  const arrangedData = useMemo(() => {
    if (!data) return [];
    if (!param.tag) return [...data];
    const initialTopic = data.find((topic) => topic.name === param.tag);
    if (!initialTopic) return [...data];
    // Place the initialTopic first, then the rest
    return [initialTopic, ...data.filter((topic) => topic.name !== param.tag)];
  }, [data]);

  useEffect(() => {
    if (arrangedData.length > 0) {
      const initialTopic = arrangedData[0];
      router.replace(`/explore/${initialTopic?.name}`);
      setCurrentTopic(initialTopic);
    }
  }, [arrangedData]);
  const handleTopicClicked = (topic: GetTopTagResponseDto) => {
    setCurrentTopic(topic);
    router.replace(`/explore/${topic.name}`);
  };
  return (
    <LandingHeaderLayout>
      <div className="flex w-full flex-col items-center justify-start px-5 py-5 md:px-20">
        {data && data.length === 0 && (
          <div className="mb-12 text-center">
            <h1
              className="mb-4 flex cursor-pointer flex-col space-y-2 text-2xl font-bold text-muted-foreground hover:underline"
              onClick={() => {
                router.push("/draft");
              }}
            >
              <p>No topics available at the moment,</p>
              <p>Write some blogs and create some topics</p>
            </h1>
          </div>
        )}
        {data && data.length > 0 && (
          <>
            <TopicList
              topicList={arrangedData} // Duplicate to ensure enough items for scrolling
              onTopicClicked={handleTopicClicked}
              currentTopic={currentTopic}
            />
            <TopicHeader currentTopic={currentTopic} />
            {children}
          </>
        )}
      </div>
    </LandingHeaderLayout>
  );
}
