import { bloggingApi } from "@/lib/HttpClient";
import { GetAdminOverallStatResponseDto } from "@/types/dtos/get-admin-overall-stat-response.dto";
import { GetMonthlyStatisticsResponseDto } from "@/types/dtos/get-monthly-statistics-response.dto";
import { GetTagDistributionResponseDto } from "@/types/dtos/get-tag-distribution-response.dto";
import { GetTopInteractivePostDto } from "@/types/dtos/get-top-interactive-post.dto";
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

  async getMonthlyUserRegistration() {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetMonthlyStatisticsResponseDto[]>
    >("/statistics/user-registration");
    return result.data.data;
  },

  async getMonthlyPostUpload() {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetMonthlyStatisticsResponseDto[]>
    >("/statistics/post-upload");
    return result.data.data;
  },

  async getTagDistribution() {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetTagDistributionResponseDto[]>
    >("/statistics/tag-distribution");
    return result.data.data;
  },

  async getTopInteractivePost() {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetTopInteractivePostDto[]>
    >("/statistics/top-interactive-post");
    return result.data.data;
  },
};
