"use client";
import { TopicHeader } from "@/components/explore/topic-header";
import { TopicList } from "@/components/explore/topic-list";
import { LandingHeaderLayout } from "@/components/layouts/landing-header";
import { useStatistics } from "@/hooks/apis/useStatistics";
import { GetTopTagResponseDto } from "@/types/dtos/get-top-tag-response.dto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useStatistics().useGetTopTag();
  const [currentTopic, setCurrentTopic] = useState<GetTopTagResponseDto>();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.push(`/explore/${data[0].name}`);
      setCurrentTopic(data[0]);
    }
  }, [data]);

  const handleTopicClicked = (topic: GetTopTagResponseDto) => {
    setCurrentTopic(topic);
    router.push(`/explore/${topic.name}`);
  };
  return (
    <LandingHeaderLayout>
      <div className="flex w-full flex-col items-center justify-start px-20 py-10">
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
              topicList={data} // Duplicate to ensure enough items for scrolling
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
