"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DraftItemCard from "@/components/setting/draft-item-card";
import { useDraft } from "@/hooks/apis/useDraft";
import { useAuthContext } from "@/context/AuthContext";
import { NotepadTextDashed } from "lucide-react";
import FullPageLoading from "@/components/loading/full-page-loading";

export default function DraftsPage() {
  const { user, loading } = useAuthContext();

  const { data, isLoading, error } = useDraft().useGetAllDraftsByAuthorId();

  if (!user) {
    return <p>Please log in to view your drafts.</p>;
  }
  if (loading || isLoading)
    return <FullPageLoading text="We are preparing everything for you." />;
  if (error) return <p>Error loading drafts: {error.message}</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drafts</CardTitle>
        <CardDescription>View and manage your drafts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Your Draft Posts</h3>
            <Button size="sm">Create Draft</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {data &&
              data.map((item) => (
                <DraftItemCard key={item.id} draft={item}></DraftItemCard>
              ))}
          </div>
          {data && data.length === 0 && (
            <div className="py-12 text-center">
              {" "}
              <NotepadTextDashed className="mx-auto h-12 w-12 text-muted-foreground" />{" "}
              <h3 className="mt-4 text-lg font-medium"> No drafts yet </h3>{" "}
              <p className="mt-2 text-sm text-muted-foreground">
                {" "}
                You haven't saved any drafts yet. Start creating your
                content!{" "}
              </p>{" "}
              <Button className="mt-4"> Create Draft </Button>{" "}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
