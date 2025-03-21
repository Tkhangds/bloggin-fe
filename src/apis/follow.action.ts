import { bloggingApi } from "@/lib/HttpClient/index";
import { Follow } from "@/types/follow";
import { CreateFollowDto } from "@/types/dtos/create-follow.dto";
import { RemoveFollowDto } from "@/types/dtos/remove-follow.dto";

// WIP

const followAction = {
  async getFollower(page?: number, limit?: number) {
    const res = await bloggingApi.get<PaginationResponseWrapper<Follow[]>>(
      `/follow/follower`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res.data.data;
  },
  async getFollowing(page?: number, limit?: number) {
    const res = await bloggingApi.get<PaginationResponseWrapper<Follow[]>>(
      `/follow/following`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res.data.data;
  },
  async createFollow(data: CreateFollowDto) {
    const res = await bloggingApi.post<BloggingSuccessResponseWrapper<Follow>>(
      "/follow",
      data,
    );
    return res.data;
  },
  async deleteFollow(data: RemoveFollowDto) {
    const res = await bloggingApi.delete<BloggingSuccessResponseWrapper>(
      `/follow`,
      {
        data,
      },
    );
    return res.data.message;
  },
};

export default followAction;
