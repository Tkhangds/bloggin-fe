"use client";

import AuthorInfo from "@/components/blog/detail/author-info";
import CommentSection from "@/components/blog/detail/comment/comment-section";
import Metric from "@/components/blog/detail/metric";
import TextToSpeechModal from "@/components/blog/detail/text-to-speech/TextToSpeechModal";
import { ViewOnlyContent } from "@/components/blog/ReadOnlyView";
import FullPageLoading from "@/components/loading/full-page-loading";
import { useReadEditor } from "@/hooks/editor/useReadEditor";
import "@/styles/index.css";
import { useParams } from "next/navigation";
import ShareButton from "@/components/blog/read/share-button";
import { Loader2, MessageSquareWarning } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { PostMonitoringStatus } from "@/enums/post-monitoring-status.enum";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useAdmin } from "@/hooks/apis/useAdmin";

export default function BlogReadingPage() {
  const params = useParams<{ id: string }>();

  const { editor, isLoading, post } = useReadEditor({
    id: params.id,
  });

  const { user } = useAuthContext();

  const { mutateAsync: flagPost, isPending: isFlagging } =
    useAdmin().useFlagPost();

  const { mutateAsync: unflagPost, isPending: isUnflagging } =
    useAdmin().useUnflagPost();

  if (isLoading || !post) {
    return <FullPageLoading text="We are preparing everything for you." />;
  }

  const handleFlagPost = async (postId: string) => {
    try {
      await flagPost(postId);
    } catch (error) {
      console.log("Error flagging post:", error);
    }
  };

  const handleUnflagPost = async (postId: string) => {
    try {
      await unflagPost(postId);
    } catch (error) {
      console.log("Error flagging post:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12 lg:px-28">
      <div
        className={twMerge(
          "flex items-center justify-between py-2",
          post.monitoringStatus !== PostMonitoringStatus.VIOLATED && "mb-6",
        )}
      >
        <p className="text-wrap text-3xl font-bold tracking-tight text-primary md:text-3xl lg:text-4xl xl:text-5xl">
          {post?.title || "Article Title"}
        </p>
        {user?.isAdmin &&
          (post.monitoringStatus !== PostMonitoringStatus.VIOLATED ? (
            <Button
              variant={"destructive_outline"}
              size={"sm"}
              onClick={() => {
                handleFlagPost(post.id);
              }}
              disabled={isFlagging}
            >
              <span>Mark Violated</span>
              {isFlagging && <Loader2 size={15} className="animate-spin" />}
            </Button>
          ) : (
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                handleUnflagPost(post.id);
              }}
              disabled={isUnflagging}
            >
              <span>Unflag post</span>
              {isUnflagging && <Loader2 size={15} className="animate-spin" />}
            </Button>
          ))}
      </div>

      {post.monitoringStatus === PostMonitoringStatus.VIOLATED && (
        <div className="mb-4 flex items-center gap-2 py-2 text-yellow-500">
          <MessageSquareWarning size={15} />
          <p className="text-sm">
            {post.authorId === user?.id
              ? "Your post has been deemed inappropriate for this platform and may not show up in others feeds"
              : "This post contains inappropriate contents. Proceed to read with cautions."}
          </p>
        </div>
      )}

      <AuthorInfo data={post} />
      <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
        <Metric data={post} />
        <div className="flex items-center gap-2">
          <TextToSpeechModal post={post}></TextToSpeechModal>|
          <ShareButton></ShareButton>
        </div>
      </div>

      <ViewOnlyContent
        editor={editor}
        className="flexwrap tiptap ProseMirror mt-4 min-h-full max-w-2xl flex-1 lg:px-0"
      />

      <CommentSection postId={params.id} commentCount={post.commentCount} />
    </div>
  );
}
