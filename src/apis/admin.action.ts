import { PostMonitoringStatus } from "@/enums/post-monitoring-status.enum";
import { bloggingApi } from "@/lib/HttpClient";
import { GetAdminOverallStatResponseDto } from "@/types/dtos/get-admin-overall-stat-response.dto";
import { GetMonthlyStatisticsResponseDto } from "@/types/dtos/get-monthly-statistics-response.dto";
import { GetTagDistributionResponseDto } from "@/types/dtos/get-tag-distribution-response.dto";
import { GetTopInteractivePostDto } from "@/types/dtos/get-top-interactive-post.dto";
import { GetTopTagResponseDto } from "@/types/dtos/get-top-tag-response.dto";
import { GetUserPaymentAdminResponseDto } from "@/types/dtos/get-user-payment-admin-response.dto";
import { Post } from "@/types/post";
import { User } from "@/types/user";

export const adminAction = {
  async getTopFollowedUser(top?: number) {
    const result = await bloggingApi.get<SuccessResponseWrapper<User[]>>(
      "/admin/statistics/top-followed-user",
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
    >("/admin/statistics/top-tag", {
      params: {
        top,
      },
    });
    return result.data.data;
  },

  async getTopOverall() {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetAdminOverallStatResponseDto>
    >("/admin/statistics/overall");
    return result.data.data;
  },

  async getMonthlyUserRegistration() {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetMonthlyStatisticsResponseDto[]>
    >("/admin/statistics/user-registration");
    return result.data.data;
  },

  async getMonthlyPostUpload() {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetMonthlyStatisticsResponseDto[]>
    >("/admin/statistics/post-upload");
    return result.data.data;
  },

  async getTagDistribution() {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetTagDistributionResponseDto[]>
    >("/admin/statistics/tag-distribution");
    return result.data.data;
  },

  async getTopInteractivePost() {
    const result = await bloggingApi.get<
      SuccessResponseWrapper<GetTopInteractivePostDto[]>
    >("/admin/statistics/top-interactive-post");
    return result.data.data;
  },

  async flagPost(postId: string) {
    const result = await bloggingApi.patch<SuccessResponseWrapper<Post>>(
      "/admin/flag-post/" + postId,
    );

    return result.data.data;
  },

  async unflagPost(postId: string) {
    const result = await bloggingApi.patch<SuccessResponseWrapper<Post>>(
      "/admin/unflag-post/" + postId,
    );

    return result.data.data;
  },

  async getPostByMonitoruingStatus(status: PostMonitoringStatus) {
    const result = await bloggingApi.get<SuccessResponseWrapper<Post[]>>(
      "/admin/post",
      {
        params: {
          status: status,
        },
      },
    );

    return result.data.data;
  },

  async getAllUserPaymentsAdminAsync() {
    const result =
      await bloggingApi.get<GetUserPaymentAdminResponseDto[]>(
        "/admin/payments",
      );
    return result.data;
  },
};
