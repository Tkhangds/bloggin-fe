import { bloggingApi } from "@/lib/HttpClient";
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
};
