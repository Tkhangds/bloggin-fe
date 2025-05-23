import followAction from "@/apis/follow.action";
import { CreateFollowDto } from "@/types/dtos/create-follow.dto";
import { RemoveFollowDto } from "@/types/dtos/remove-follow.dto";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useFollow = () => {
  const qerryClient = useQueryClient();

  const useCreateFollow = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: CreateFollowDto }) => {
        return await followAction.createFollow(data);
      },
      onSuccess: (result) => {
        console.log(result);
        qerryClient.invalidateQueries({ queryKey: ["follower"] });
        qerryClient.invalidateQueries({ queryKey: ["following"] });
        toast.success("Followed author");
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
    });
  };

  const useDeleteFollow = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: RemoveFollowDto }) => {
        return await followAction.deleteFollow(data);
      },
      onSuccess: (result) => {
        console.log(result);
        qerryClient.invalidateQueries({ queryKey: ["follower"] });
        qerryClient.invalidateQueries({ queryKey: ["following"] });
        toast.success("Unfollowed author");
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
    });
  };

  const useGetFollower = (userId?: string, limit?: number) => {
    return useInfiniteQuery({
      queryKey: ["follower", userId],
      queryFn: ({ pageParam = 1 }) =>
        userId
          ? followAction.getFollower(userId, pageParam, limit)
          : followAction.getFollower(undefined, pageParam, limit),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.meta.nextPage ?? undefined;
      },
    });
  };

  const useGetFollowing = (userId?: string, limit?: number) => {
    return useInfiniteQuery({
      queryKey: ["following", userId],
      queryFn: ({ pageParam = 1 }) =>
        userId
          ? followAction.getFollowing(userId, pageParam, limit)
          : followAction.getFollowing(undefined, pageParam, limit),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.meta.nextPage ?? undefined;
      },
    });
  };

  return {
    useCreateFollow,
    useGetFollower,
    useGetFollowing,
    useDeleteFollow,
  };
};
