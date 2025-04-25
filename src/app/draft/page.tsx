"use client";

import { Suspense } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";

import { useState, useEffect } from "react";
import { useDraft } from "@/hooks/apis/useDraft";
import { useRouter } from "next/navigation";
import { initialContent } from "@/lib/editor/data/initialContent";
import firstSentenceJson from "@/utils/first-sentence-json";
import { useAuthContext } from "@/context/AuthContext";
import FullPageLoading from "@/components/loading/full-page-loading";

export default function Page() {
  const router = useRouter();
  const { useCreateDraft } = useDraft();
  const { user } = useAuthContext();

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
      <Suspense
        fallback={
          <FullPageLoading text="We are preparing everything for you." />
        }
      >
        <FullPageLoading text="We are preparing everything for you." />
      </Suspense>
    </>
  );
}
