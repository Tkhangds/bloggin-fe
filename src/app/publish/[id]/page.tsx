"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { X, Search, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useDraft } from "@/hooks/apis/useDraft";
import { CreatePostDto, CreatePostSchema } from "@/types/dtos/create-post.dto";
import { usePost } from "@/hooks/apis/usePost";
import { useTag } from "@/hooks/apis/useTag";
import debounce from "lodash/debounce";

export default function PublishPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [tagSearch, setTagSearch] = useState("");
  const [tagSearchTemporary, setTagSearchTemporary] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const { mutateAsync: createPost } = usePost().useCreatePost();
  const { mutateAsync: deleteDraft } = useDraft().useDeleteDraftById();
  const { data: filteredTags } = useTag().useGetAllTags(tagSearchTemporary);

  const form = useForm<CreatePostDto>({
    mode: "onSubmit",
    resolver: zodResolver(CreatePostSchema),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: {},
  } = form;

  const { useGetDraftById } = useDraft();

  const { data: draft } = useGetDraftById(params.id);

  const [tagInput, setTagInput] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const saveSearchTagInput = useCallback(
    debounce((tag: string) => {
      setTagSearchTemporary(tag);
    }, 300),
    [],
  );

  useEffect(() => {
    if (draft) {
      setValue("content", draft.content);
      setValue("authorId", draft.authorId);
    }
  }, [draft]);

  useEffect(() => {
    if (tagSearch.trim() === "") {
      setShowResults(false);
    }

    saveSearchTagInput(tagSearch);
    setValue("tags", tags);
    console.log(tags);
    setShowResults(true);
  }, [tagSearch, tags]);

  const handleAddTag = () => {
    if (tags.length >= 5) {
      toast.error("You can only add up to 5 tags");
      return;
    }
    if (!tagInput.trim()) return;

    if (tags.includes(tagInput.trim())) {
      setError("Tag already exists");
      return;
    }

    setTags([...tags, tagInput.trim()]);
    setTagInput("");
    setError(null);
  };

  const handleAddSearchedTag = (tag: string) => {
    if (tags.length >= 5) {
      toast.error("You can only add up to 5 tags");
      return;
    }

    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagSearch("");
      setShowResults(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmitHandle = async (data: CreatePostDto) => {
    const blog = await createPost({ data });
    await deleteDraft(params.id);
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
              {/* Title Section - Full Width */}
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
                {error === "Title is required" && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
              </div>

              {/* Tags Section */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Tag className="mr-2 h-5 w-5 text-muted-foreground" />
                  <h3 className="text-base font-medium">Tags</h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Custom Tag Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="tags"
                      className="text-sm text-muted-foreground"
                    >
                      Add Custom Tag
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        placeholder="Enter custom tag"
                        value={tagInput}
                        onChange={(e) =>
                          setTagInput(e.target.value.toLowerCase())
                        }
                        onKeyDown={handleKeyDown}
                        className="h-10"
                      />

                      <Button
                        type="button"
                        onClick={handleAddTag}
                        size="icon"
                        className="h-10 w-10 shrink-0"
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Add tag</span>
                      </Button>
                    </div>
                    {/* Error message */}
                    <div className="h-5">
                      {error && error !== "Title is required" && (
                        <p className="text-xs text-red-500">{error}</p>
                      )}
                    </div>
                  </div>

                  {/* Tag Search */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="tagSearch"
                      className="text-sm text-muted-foreground"
                    >
                      Search Existing Tags
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        id="tagSearch"
                        placeholder="Search tags..."
                        value={tagSearch}
                        onChange={(e) =>
                          setTagSearch(e.target.value.toLowerCase())
                        }
                        className="h-10 pl-8"
                        onFocus={() =>
                          tagSearch.trim() !== "" && setShowResults(true)
                        }
                        onBlur={() =>
                          setTimeout(() => setShowResults(false), 200)
                        }
                      />
                    </div>

                    {/* Search Results */}
                    <div className="relative h-[40px]" data-allow-shifts>
                      {showResults &&
                        filteredTags &&
                        filteredTags.length > 0 && (
                          <div className="absolute z-10 max-h-[150px] w-full overflow-y-auto rounded-md border bg-background shadow-sm">
                            <ul className="px-1 py-1 text-sm">
                              {filteredTags.map((tag) => (
                                <li
                                  key={tag.id}
                                  className="flex cursor-pointer items-center rounded px-2 py-1.5 hover:bg-muted"
                                  onClick={() => handleAddSearchedTag(tag.name)}
                                  onMouseDown={(e) => e.preventDefault()}
                                >
                                  <Plus className="mr-2 h-3 w-3 text-muted-foreground" />
                                  {tag.name.toLowerCase()}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Selected Tags Display */}
                <div className="rounded-lg bg-muted p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-medium">Selected Tags</h3>
                    <span className="text-xs text-muted-foreground">
                      {tags.length} tags
                    </span>
                  </div>

                  <div className="min-h-[60px]">
                    {tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            onClick={() => handleRemoveTag(tag)}
                            className="h-auto cursor-pointer bg-[#181818]/20 px-2.5 py-1 text-xs font-normal hover:bg-[#181818]/40"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1.5 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {tag}</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No tags added yet. Tags help categorize your content.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button - Full Width */}
              <div className="pt-2">
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
