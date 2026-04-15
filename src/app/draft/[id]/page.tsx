"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";

import FullPageLoading from "@/components/loading/full-page-loading";
import { useSearchParams } from "next/navigation";

const BlockEditor = dynamic(
  () =>
    import("@/components/editor/BlockEditor").then((m) => m.BlockEditor),
  {
    ssr: false,
    loading: () => (
      <FullPageLoading text="We are preparing everything for you." />
    ),
  },
);

export default function Page({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const templateName = searchParams.get("templateName");

  return (
    <Suspense
      fallback={
        <FullPageLoading text="We are preparing everything for you." />
      }
    >
      <BlockEditor
        id={params.id}
        mode="draft"
        templateName={templateName ?? undefined}
      />
    </Suspense>
  );
}
