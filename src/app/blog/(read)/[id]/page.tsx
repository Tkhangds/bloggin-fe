"use client";

import AuthorInfo from "@/components/blog/detail/author-info";
import CommentSection from "@/components/blog/detail/comment/comment-section";
import Metric from "@/components/blog/detail/metric";
import { ViewOnlyContent } from "@/components/blog/ReadOnlyView";
import FullPageLoading from "@/components/loading/full-page-loading";
import { useReadEditor } from "@/hooks/editor/useReadEditor";
import "@/styles/index.css";
import { useParams } from "next/navigation";

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
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        {post?.title || "Article Title"}
      </h1>
      <AuthorInfo data={post} />
      <Metric data={post} />

      <ViewOnlyContent
        editor={editor}
        className="flexwrap tiptap ProseMirror mt-4 min-h-full max-w-2xl flex-1 lg:px-0"
      />

      <CommentSection postId={params.id} commentCount={post.commentCount} />
    </div>
  );
}
