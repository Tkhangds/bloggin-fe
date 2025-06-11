import { bloggingApi } from "@/lib/HttpClient";
import { GetAdminOverallStatResponseDto } from "@/types/dtos/get-admin-overall-stat-response.dto";
import { GetTopTagResponseDto } from "@/types/dtos/get-top-tag-response.dto";
import { User } from "@/types/user";

export const statisticsAction = {
  async getTopFollowedUser(top?: number) {
    const result = await bloggingApi.get<SuccessResponseWrapper<User[]>>(
      "/statistics/top-followed-user",
      {
        params: {
          top,
        },
      },
    );
    return result.data.data;
  },

  async getTopTag(top?: number) {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetTopTagResponseDto[]>
    >("/statistics/top-tag", {
      params: {
        top,
      },
    });
    return result.data.data;
  },

  async getTopOverall() {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetAdminOverallStatResponseDto>
    >("/statistics/overall");
    return result.data.data;
  },
};
