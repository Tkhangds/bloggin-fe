import favoriteAction from "@/apis/favorite.action";
import postAction from "@/apis/post.action";
import { CreateFavoriteDto } from "@/types/dtos/create-favorite.dto";
import { RemoveFavoriteDto } from "@/types/dtos/remove-favorite.dto";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useFavorite = () => {
  const queryClient = useQueryClient();

  const useGetFavoriteers = (limit?: number) => {
    return useInfiniteQuery({
      queryKey: ["favorite"],
      queryFn: ({ pageParam = 1 }) =>
        favoriteAction.getFavorite(pageParam, limit),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.meta.nextPage ?? undefined;
      },
    });
  };

  const useGetFavoriteCount = (postId: string) => {
    return useQuery({
      queryKey: ["favCount", postId],
      queryFn: () => {
        return favoriteAction.getFavoriteCount(postId);
      },
    });
  };

  const useCreateFavorite = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: CreateFavoriteDto }) => {
        return await favoriteAction.createFavorite(data);
      },
      onSuccess: (result, variable) => {
        queryClient.invalidateQueries({
          queryKey: ["favCount", result.data.postId],
        });
        queryClient.invalidateQueries({
          queryKey: ["favorite"],
        });
        toast.success("Favored blog");
      },
      onError: (error) => {
        toast.error("Failed to favorite blog");
      },
    });
  };
  const useDeleteFavorite = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: RemoveFavoriteDto }) => {
        return await favoriteAction.deleteFavorite(data);
      },
      onSuccess: (result, variable) => {
        queryClient.invalidateQueries({
          queryKey: ["favCount", variable.data.postId],
        });

        toast.success("Unfavored blog");
      },
      onError: (error) => {
        toast.error("Failed to favorite blog");
      },
    });
  };

  return {
    useGetFavoriteers,
    useGetFavoriteCount,
    useCreateFavorite,
    useDeleteFavorite,
  };
};
