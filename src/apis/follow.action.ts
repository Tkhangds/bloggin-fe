import { bloggingApi } from "@/lib/HttpClient/index";
import { Follow } from "@/types/follow";
import { CreateFollowDto } from "@/types/dtos/create-follow.dto";
import { RemoveFollowDto } from "@/types/dtos/remove-follow.dto";
import { GetFollowResponse } from "@/types/dtos/get-following-response.dto";

// WIP

const followAction = {
  async getFollower(userId?: string, page?: number, limit?: number) {
    const route = userId ? `/follow/${userId}/follower` : `/follow/follower`;
    const result = await bloggingApi.get<
      PaginationResponseWrapper<GetFollowResponse[]>
    >(route, {
      params: {
        page,
        limit,
      },
    });
    return result.data;
  },
  async getFollowing(userId?: string, page?: number, limit?: number) {
    const route = userId ? `/follow/${userId}/following` : `/follow/following`;
    const result = await bloggingApi.get<
      PaginationResponseWrapper<GetFollowResponse[]>
    >(route, {
      params: {
        page,
        limit,
      },
    });
    return result.data;
  },
  async createFollow(data: CreateFollowDto) {
    const result = await bloggingApi.post<SuccessResponseWrapper<Follow>>(
      "/follow",
      data,
    );
    return result.data;
  },
  async deleteFollow(data: RemoveFollowDto) {
    const result = await bloggingApi.delete<SuccessResponseWrapper>(`/follow`, {
      data,
    });
    return result.data.message;
  },
};

export default followAction;
