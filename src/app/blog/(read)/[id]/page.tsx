"use client";

import AuthorInfo from "@/components/blog/detail/author-info";
import Metric from "@/components/blog/detail/metric";
import CommentSection from "@/components/blog/detail/comment/comment-section";
import FullPageLoading from "@/components/loading/loading";
import ExtensionKit from "@/extensions/extension-kit";
import { usePost } from "@/hooks/apis/usePost";
import { initialContent } from "@/lib/editor/data/initialContent";
import { generateHTML } from "@tiptap/html";
import { AnyExtension } from "@tiptap/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogReadingPage() {
  const { useGetPostById } = usePost();
  const params = useParams<{ id: string }>();

  const { data, isPending } = useGetPostById(params.id);

  const html = generateHTML(
    initialContent,
    [...ExtensionKit({})].filter((e): e is AnyExtension => e !== undefined),
  );

  const [content, setContent] = useState<string>(html);

  useEffect(() => {
    if (data) {
      setContent(
        generateHTML(
          JSON.parse(data.content),
          [...ExtensionKit({})].filter(
            (e): e is AnyExtension => e !== undefined,
          ),
        ),
      );
    }
  }, [data]);

  if (!data || isPending) {
    return <FullPageLoading text="We are preparing everything for you." />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        {data?.title || "Article Title"}
      </h1>
      <AuthorInfo data={data} />
      <Metric data={data} />
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <CommentSection postId={params.id} commentCount={data.commentCount} />
    </div>
  );
}
