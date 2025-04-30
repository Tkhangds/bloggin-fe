import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useFollow } from "@/hooks/apis/useFollow";
import { Post } from "@/types/post";
import { formatDateFromISOString } from "@/utils/date-convert";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Dot } from "lucide-react";

export default function AuthorInfo({ data }: { data: Post }): JSX.Element {
  const { user } = useAuthContext();
  const { data: following, isLoading } = useFollow().useGetFollowing();
  const followAction = useFollow().useCreateFollow();
  const unfollowAction = useFollow().useDeleteFollow();
  const isFollowing = following?.pages[0].data.some((following) => {
    return following.author.id === data.authorId;
  });
  console.log(user);
  const ownPost = user?.id === data.authorId;

  const handleFollow = async () => {
    const authorId = data.authorId;
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

  return (
    <div className="mb-8 flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${data.author.displayName}`}
          alt="Author"
          className="rounded-full"
        />
        <AvatarFallback>N/A</AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col items-center gap-1 sm:flex-row sm:justify-start sm:gap-2">
        <div className="flex items-center gap-3">
          <span className="font-medium">{data.author.displayName}</span>
          {user && !ownPost && !isLoading && (
            <Button
              variant={isFollowing ? "ghost" : "outline"}
              size="sm"
              className="items-center rounded-full border-gray-500 font-medium shadow-none"
              onClick={handleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        <Dot className="text-gray-500" />
        <div className="flex items-center text-sm text-gray-500">
          <span>
            {data?.createdAt
              ? formatDateFromISOString(data.createdAt)
              : "Nov 15, 2024"}
          </span>
        </div>
      </div>
    </div>
  );
}
