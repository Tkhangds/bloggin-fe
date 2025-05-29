import { FollowButton } from "@/components/shared/follow-button";
import { Post } from "@/types/post";
import { formatDateFromISOString } from "@/utils/date-convert";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dot } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthorInfo({ data }: { data: Post }): JSX.Element {
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

        {/* {user && !ownPost && !isLoading && (
          <Button
            variant={isFollowing ? "ghost" : "outline"}
            size="sm"
            className="items-center rounded-full border-gray-500 font-medium shadow-none"
            onClick={handleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )} */}
        <FollowButton userId={data.authorId}></FollowButton>
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
