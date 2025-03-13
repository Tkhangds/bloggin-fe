import { Suspense } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";

import { BlockEditor } from "@/components/editor/BlockEditor";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BlockEditor id={params.id} />
      </Suspense>
    </>
  );
}
