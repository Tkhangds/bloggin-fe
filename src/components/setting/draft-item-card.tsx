"use client";

import { useDraft } from "@/hooks/apis/useDraft";
import { Draft } from "@/types/draft";
import { formatDateFromISOString } from "@/utils/date-convert";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";

export default function DraftItemCard({
  draft,
  isCollaborative = false
}: {
  draft: Draft;
  isCollaborative?: boolean;
}) {
  const router = useRouter();
  const { mutateAsync: deleteDraft } = useDraft().useDeleteDraftById();
  const handleDeleteDraft = async (id: string) => {
    await deleteDraft(id);
  };
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle
            onClick={() => router.push(`/draft/${draft.id}`)}
            className="cursor-pointer text-base"
          >
            {draft.title}
          </CardTitle>
        </div>
        <CardDescription>
          Last edited on {formatDateFromISOString(draft.updatedAt)}
        </CardDescription>
      </CardHeader>
      <div className="flex items-center justify-end border-t p-4">
        <div className="flex space-x-2">
          <Button
            variant="destructive_outline"
            size="sm"
            onClick={() => handleDeleteDraft(draft.id)}
          >
            {isCollaborative ? "Leave" : "Delete"}
          </Button>

          {!isCollaborative && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.replace(`/publish/${draft.id}`)}
            >
              Publish
            </Button>
          )}

          <Button
            size="sm"
            onClick={() => {
              router.replace(`/draft/${draft.id}`);
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
}
