import React from "react";
import { Tag, Plus, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagsManagerType } from "../../hooks/useTagsManagement";

interface TagsSectionProps {
  tagsManager: TagsManagerType;
}

export function TagsSection({ tagsManager }: TagsSectionProps) {
  const {
    tags,
    tagInput,
    tagSearch,
    error,
    showResults,
    setShowResults,
    filteredTags,
    setTagInput,
    setTagSearch,
    handleAddTag,
    handleAddSearchedTag,
    handleRemoveTag,
    handleKeyDown,
  } = tagsManager;

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Tag className="mr-2 h-5 w-5 text-muted-foreground" />
        <h3 className="text-base font-medium">Tags</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tags" className="text-sm text-muted-foreground">
            Add Custom Tag
          </Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="Enter custom tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value.toLowerCase())}
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
          <div className="h-5">
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tagSearch" className="text-sm text-muted-foreground">
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
              onChange={(e) => setTagSearch(e.target.value.toLowerCase())}
              className="h-10 pl-8"
              onFocus={() => tagSearch.trim() !== "" && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
          </div>

          <div className="relative h-[40px]" data-allow-shifts>
            {showResults && filteredTags && filteredTags.length > 0 && (
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
  );
}
