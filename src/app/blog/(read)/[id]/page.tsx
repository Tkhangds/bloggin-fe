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


export default function BlogReadingPage() {
  const params = useParams<{ id: string }>();

  const { editor, isLoading, post } = useReadEditor({
    id: params.id,
  });

  if (isLoading || !post) {
    return <FullPageLoading text="We are preparing everything for you." />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12 lg:px-28">
      <p className="mb-6 text-wrap text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        {post?.title || "Article Title"}
      </p>
      <AuthorInfo data={post} />
      <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
        <Metric data={post} />
        <div className="flex items-center gap-2">
          <TextToSpeechModal post={post}></TextToSpeechModal>

          |

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
