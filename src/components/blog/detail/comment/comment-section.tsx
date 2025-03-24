import { Separator } from "@radix-ui/react-dropdown-menu";
import CommentsList from "./comment-list";
import CommentForm from "./comment-form";

export default function CommentSection({
  postId,
  commentCount,
}: {
  postId: string;
  commentCount: number;
}): JSX.Element {
  return (
    <div className="mt-12">
      <Separator className="my-8" />
      <h3 className="mb-6 text-2xl font-bold">Comments ({commentCount})</h3>
      <CommentForm postId={postId} />
      <CommentsList postId={postId} />
    </div>
  );
}
