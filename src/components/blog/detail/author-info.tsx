import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useFollow } from "@/hooks/apis/useFollow";
import { Post } from "@/types/post";
import { formatDateFromISOString } from "@/utils/date-convert";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Dot } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthorInfo({ data }: { data: Post }): JSX.Element {
  const { user } = useAuthContext();
  const { data: following, isLoading } = useFollow().useGetFollowing();
  const followAction = useFollow().useCreateFollow();
  const unfollowAction = useFollow().useDeleteFollow();
  const isFollowing = following?.pages[0].data.some((following) => {
    return following.author.id === data.authorId;
  });
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

  const router = useRouter();

  return (
    <div className="mb-8 flex w-full items-center">
      <div className="flex w-full items-center gap-2">
        <div
          className="group flex items-center gap-2"
          onClick={() => {
            router.push(`/profile/${data.authorId}`);
          }}
        >
          <Avatar className="group h-8 w-8 cursor-pointer">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${data.author.displayName}`}
              alt="Author"
              className="rounded-full"
            />
            <AvatarFallback>N/A</AvatarFallback>
          </Avatar>
          <span className="cursor-pointer font-medium group-hover:underline group-hover:underline-offset-4">
            {data.author.displayName}
          </span>
        </div>

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
