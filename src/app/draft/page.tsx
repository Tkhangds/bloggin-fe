"use client";

import "iframe-resizer/js/iframeResizer.contentWindow";
import { Suspense } from "react";

import FullPageLoading from "@/components/loading/full-page-loading";
import { useAuthContext } from "@/context/AuthContext";
import { useDraft } from "@/hooks/apis/useDraft";
import firstSentenceJson from "@/utils/first-sentence-json";
import getTemplate from "@/utils/getTemplate";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PageContent() {
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
  }, [user, templateName, createDraft, router]);

  useEffect(() => {
    if (id) {
      router.replace(`/draft/${id}?templateName=${templateName}`);
    }
  }, [id, templateName, router]);

  return <FullPageLoading text="We are preparing everything for you." />;
}

export default function Page() {
  return (
    <Suspense
      fallback={<FullPageLoading text="We are preparing everything for you." />}
    >
      <PageContent />
    </Suspense>
  );
}
