"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { TagsSection } from "@/components/publish/tag-section";
import { useDraft } from "@/hooks/apis/useDraft";
import { usePost } from "@/hooks/apis/usePost";
import { useTagsManagement } from "@/hooks/useTagsManagement";
import { CreatePostDto, CreatePostSchema } from "@/types/dtos/create-post.dto";

export default function PublishPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { mutateAsync: createPost } = usePost().useCreatePost();
  const { mutateAsync: deleteDraft } = useDraft().useDeleteDraftById();

  const form = useForm<CreatePostDto>({
    mode: "onSubmit",
    resolver: zodResolver(CreatePostSchema),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const { queryClient, useGetDraftById } = useDraft();

  const { data: draft } = useGetDraftById(params.id);

  const tagsManager = useTagsManagement();

  useEffect(() => {
    if (draft) {
      setValue("content", draft.content);
      setValue("authorId", draft.authorId);
    }
  }, [draft]);

  useEffect(() => {
    setValue("tags", tagsManager.tags);
  }, [tagsManager.tags, setValue]);

  const onSubmitHandle = async (data: CreatePostDto) => {
    const blog = await createPost({ data });
    await deleteDraft(params.id);
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
    router.push("/blog/" + blog.id);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="container max-w-3xl py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-2xl font-bold">
              Create New Post
            </CardTitle>
            <CardDescription>
              Add a title and relevant tags to help others discover your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmitHandle)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Title
                </Label>

                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="title"
                      placeholder="Enter a descriptive title for your post"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      className="h-12 text-base"
                    />
                  )}
                />
                {errors && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title?.message}
                  </p>
                )}
              </div>

              <TagsSection tagsManager={tagsManager} />

              <div className="flex items-center justify-end space-x-4 pt-2">
                <Button
                  variant="outline"
                  className="w-full px-8 md:w-auto"
                  size="lg"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full px-8 md:w-auto"
                  size="lg"
                >
                  Publish
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
