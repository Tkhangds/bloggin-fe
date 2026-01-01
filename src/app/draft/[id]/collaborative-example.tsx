"use client";

import { Suspense } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";

import { CollaborativeBlockEditor } from "@/components/editor/CollaborativeBlockEditor";
import FullPageLoading from "@/components/loading/full-page-loading";
import { useSearchParams } from "next/navigation";

export default function CollaborativeDraftPage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const templateName = searchParams.get("templateName");

  return (
    <>
      <Suspense
        fallback={
          <FullPageLoading text="Setting up collaborative editing..." />
        }
      >
        <CollaborativeBlockEditor
          draftId={params.id}
          templateName={templateName ?? undefined}
        />
      </Suspense>
    </>
  );
}
