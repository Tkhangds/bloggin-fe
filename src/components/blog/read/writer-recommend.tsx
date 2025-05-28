"use client";
import { FollowButton } from "@/components/shared/follow-button";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useStatistics } from "@/hooks/apis/useStatistics";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronRight } from "lucide-react";

export default function WriterRecommend(): JSX.Element {
  const { data, isLoading } = useStatistics().useGetTopFollowedUser(4);
  const { user } = useAuthContext();

  const filteredData = data
    ?.filter((writer) => writer.id !== user?.id)
    .slice(0, 3);

  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h2 className="mb-4 text-lg font-bold">Recommended Writers</h2>
      <div className="space-y-4">
        {!isLoading &&
          filteredData &&
          filteredData.map((writer, index) => {
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={writer.avatarUrl}
                      alt={writer.displayName}
                    />
                    <AvatarFallback>
                      {writer.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{writer.displayName}</h3>
                    <p className="line-clamp-1 w-full text-sm text-muted-foreground">
                      {writer.specialties}
                    </p>
                  </div>
                </div>
                <FollowButton
                  userId={writer.id}
                  alwaysShow={true}
                ></FollowButton>
              </div>
            );
          })}
        <Button
          variant="ghost"
          className="mt-4 w-full text-gray-500 hover:text-gray-700"
        >
          See More Authors
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
