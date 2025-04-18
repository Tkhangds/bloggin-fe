"use client";

import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContext";
import { usePost } from "@/hooks/apis/usePost";
import PostItemCard from "@/components/setting/post-item-card";
import FullPageLoading from "@/components/loading/full-page-loading";

export default function PostsPage() {
  const { user, loading } = useAuthContext();

  const { data, isLoading, error } = usePost().useGetPostByAuthor();

  if (!user) {
    return <p>Please log in to view your drafts.</p>;
  }
  if (error) return <p>Error loading drafts: {error.message}</p>;
  if (loading || isLoading)
    return <FullPageLoading text="We are preparing everything for you." />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Posts</CardTitle>
        <CardDescription>View and manage your posts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Your Blog Posts</h3>
            <Button size="sm">Create Post</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {data &&
              data.map((item) => (
                <PostItemCard key={item.id} post={item}></PostItemCard>
              ))}
          </div>
          {data && data.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium"> No posts yet </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't created any posts yet. Start sharing your content!
              </p>
              <Button className="mt-4"> Create Post </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
