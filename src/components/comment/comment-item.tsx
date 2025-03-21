import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { timeAgo } from "@/utils/date-from-now";
import { Comment } from "@/types/comment";

interface CommentProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentProps): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {/* Comment Header */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage
              className="rounded-full"
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${comment.author.displayName}`}
              alt={comment.author.displayName}
            />
            <AvatarFallback>
              {comment.author.displayName?.charAt(0) ?? "N/A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{comment.author.displayName}</div>
            <div className="text-sm text-gray-500">
              {timeAgo(comment.createdAt)}
            </div>
          </div>
        </div>

        {/* Comment Content */}
        <p className="pl-13 text-gray-800">{comment.content}</p>

        {/* Comment Actions */}
        <div className="pl-13 flex items-center gap-4"></div>
      </div>
    </div>
  );
}
