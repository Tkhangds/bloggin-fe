"use client";
import { FollowButton } from "@/components/shared/follow-button";
import { CardDescription } from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContext";
import { useAdmin } from "@/hooks/apis/useAdmin";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";

export default function WriterRecommend(): JSX.Element {
  const { data, isLoading } = useAdmin().useGetTopFollowedUser(5);
  const { user } = useAuthContext();
  const router = useRouter();

  const filteredData = data?.filter(
    (writer) => writer.id !== user?.id && writer.displayName !== "admin",
  );

  return (
    <div className="border-muted-background border-t-[0.1rem] p-6">
      <h2 className="mb-4 text-lg font-bold dark:text-black">
        Recommended Writers
      </h2>
      <div className="space-y-4">
        {!isLoading &&
          filteredData &&
          filteredData.map((writer, index) => {
            return (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-between py-1 text-[#171717]"
                onClick={() => {
                  router.push(`/profile/${writer.id}`);
                }}
              >
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
                  className="dark:text-white"
                  userId={writer.id}
                  alwaysShow={true}
                ></FollowButton>
              </div>
            );
          })}
        {!filteredData && (
          <CardDescription className="flex w-full justify-center">
            No author available
          </CardDescription>
        )}
      </div>
    </div>
  );
}
