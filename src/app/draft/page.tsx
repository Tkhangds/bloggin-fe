"use client";

import { Suspense } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";

import { BlockEditor } from "@/components/editor/BlockEditor";
import { useState, useEffect } from "react";
import { useDraft } from "@/hooks/apis/useDraft";
import { useRouter } from "next/navigation";
import { initialContent } from "@/lib/editor/data/initialContent";

export default function Page() {
  const router = useRouter();
  const { useCreateDraft } = useDraft();

  const { mutateAsync: createDraft } = useCreateDraft();

  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchDraft() {
      const draft = await createDraft({
        data: {
          content: JSON.stringify(initialContent),
          title: "Untitled",
          authorId: "123",
        },
      });

      setId(draft.data.id);
    }

    fetchDraft();
  }, []);

  useEffect(() => {
    if (id) {
      router.replace(`/draft/${id}`);
    }
  }, [id]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BlockEditor id={undefined} />
      </Suspense>
    </>
  );
}
