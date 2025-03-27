"use client";

import { useDraft } from "@/hooks/apis/useDraft";
import { Draft } from "@/types/draft";
import { formatDateFromISOString } from "@/utils/date-convert";
import firstSentenceJson from "@/utils/first-sentence-json";
import { NotepadTextDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function DraftItemCard({ draft }: { draft: Draft }) {
  const router = useRouter();
  const { mutateAsync: deleteDraft } = useDraft().useDeleteDraftById();
  const handleDeleteDraft = async (id: string) => {
    await deleteDraft(id);
  };
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{draft.title}</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <NotepadTextDashed className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Last edited on {formatDateFromISOString(draft.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {firstSentenceJson(draft.content)}
        </p>
      </CardContent>
      <div className="flex items-center justify-end border-t p-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.replace(`/draft/${draft.id}`)}
          >
            Continue
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.replace(`/publish/${draft.id}`)}
          >
            Publish
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteDraft(draft.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
