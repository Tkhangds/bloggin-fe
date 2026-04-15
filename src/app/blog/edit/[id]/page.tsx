import dynamic from "next/dynamic";
import { Suspense } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";

import FullPageLoading from "@/components/loading/full-page-loading";

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
  return (
    <Suspense
      fallback={
        <FullPageLoading text="We are preparing everything for you." />
      }
    >
      <BlockEditor id={params.id} mode="post" />
    </Suspense>
  );
}
