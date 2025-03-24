import React, { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import debounce from "lodash/debounce";
import { useTag } from "@/hooks/apis/useTag";
import { Tag } from "@/types/tag";

export interface TagsManagerType {
  tags: string[];
  tagInput: string;
  tagSearch: string;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  filteredTags: Tag[] | undefined;
  setTagInput: (value: string) => void;
  setTagSearch: (value: string) => void;
  handleAddTag: () => void;
  handleAddSearchedTag: (tag: string) => void;
  handleRemoveTag: (tag: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export function useTagsManagement(): TagsManagerType {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [tagSearchTemporary, setTagSearchTemporary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const { data: filteredTags } = useTag().useGetAllTags(tagSearchTemporary);

  const saveSearchTagInput = useCallback(
    debounce((tag: string) => {
      setTagSearchTemporary(tag);
    }, 300),
    [],
  );

  useEffect(() => {
    if (tagSearch.trim() === "") {
      setShowResults(false);
    } else {
      saveSearchTagInput(tagSearch);
      setShowResults(true);
    }
  }, [tagSearch, saveSearchTagInput]);

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

  return {
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
  };
}
