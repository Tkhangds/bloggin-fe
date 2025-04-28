"use client";

import { Suspense } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";

import { useState, useEffect } from "react";
import { useDraft } from "@/hooks/apis/useDraft";
import { useRouter, useSearchParams } from "next/navigation";
import { initialContent } from "@/lib/editor/data/initialContent";
import firstSentenceJson from "@/utils/first-sentence-json";
import { useAuthContext } from "@/context/AuthContext";
import FullPageLoading from "@/components/loading/full-page-loading";
import getTemplate from "@/utils/getTemplate";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateName = searchParams.get("templateName");
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
      const content = JSON.stringify(getTemplate(templateName || ""));
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
      router.replace(`/draft/${id}?templateName=${templateName}`);
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
