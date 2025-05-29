"use client";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { useFollow } from "@/hooks/apis/useFollow";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

export const FollowButton = ({
  alwaysShow,
  className,
  userId,
}: {
  alwaysShow?: boolean;
  className?: string;
  userId: string;
}) => {
  const { user } = useAuthContext();
  const { data: following, isLoading } = useFollow().useGetFollowing();
  const followAction = useFollow().useCreateFollow();
  const unfollowAction = useFollow().useDeleteFollow();
  const isFollowing = following?.pages[0].data.some((following) => {
    return following.author.id === userId;
  });
  const ownPost = user?.id === userId;
  const router = useRouter();

  const handleFollow = async () => {
    if (alwaysShow && !user) {
      router.push(`/sign-in`);
      return;
    }
    const authorId = userId;
    try {
      if (isFollowing) {
        await unfollowAction.mutateAsync({
          data: {
            authorId,
          },
        });
        return;
      } else {
        await followAction.mutateAsync({
          data: {
            authorId,
          },
        });
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  if (!alwaysShow && (!user || ownPost || isLoading)) return null;
  return (
    <Button
      variant={isFollowing ? "ghost" : "outline"}
      size="sm"
      className={twMerge(
        "items-center rounded-full border-gray-500 font-medium shadow-none",
        className,
      )}
      onClick={handleFollow}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};
