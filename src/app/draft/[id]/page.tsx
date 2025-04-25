import { Suspense } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";

import { BlockEditor } from "@/components/editor/BlockEditor";
import FullPageLoading from "@/components/loading/full-page-loading";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense
        fallback={
          <FullPageLoading text="We are preparing everything for you." />
        }
      >
        <BlockEditor id={params.id} mode="draft" />
      </Suspense>
    </>
  );
}
