"use client";

import { Suspense } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";

import { BlockEditor } from "@/components/editor/BlockEditor";
import { useState, useEffect } from "react";
import { useDraft } from "@/hooks/apis/useDraft";
import { useRouter } from "next/navigation";
import { initialContent } from "@/lib/editor/data/initialContent";
import firstSentenceJson from "@/utils/first-sentence-json";
import { useAuthProvider } from "@/context/AuthContext";

export default function Page() {
  const router = useRouter();
  const { useCreateDraft } = useDraft();
  const { user } = useAuthProvider();

  const { mutateAsync: createDraft } = useCreateDraft();

  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchDraft() {
      if (!user) {
        router.replace("/login");
        return;
      }
      const content = JSON.stringify(initialContent);
      const draft = await createDraft({
        data: {
          content: content,
          title: firstSentenceJson(content) || "Untitled",
          authorId: user.id,
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
