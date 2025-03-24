import { Button } from "@/components/ui/button";
import { Post } from "@/types/post";
import { formatDateFromISOString } from "@/utils/date-convert";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function AuthorInfo({ data }: { data: Post }): JSX.Element {
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
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex items-center gap-1">
          <span className="font-medium">{data.author.displayName}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 font-medium text-green-600"
          >
            Follow
          </Button>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>3 min read</span>
          <span className="mx-1">·</span>
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
