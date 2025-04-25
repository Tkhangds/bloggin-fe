import { bloggingApi } from "@/lib/HttpClient/index";
import { Favorite } from "@/types/favorite";
import { CreateFavoriteDto } from "@/types/dtos/create-favorite.dto";
import { RemoveFavoriteDto } from "@/types/dtos/remove-favorite.dto";

// WIP

const favoriteAction = {
  async getFavorite(page?: number, limit?: number) {
    const result = await bloggingApi.get<PaginationResponseWrapper<Favorite[]>>(
      `/favorite`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return result.data;
  },
  async getFavoriteCount(postId: string) {
    const res = await bloggingApi.get(`favorite/${postId}/count`);
    return res.data;
  },
  async createFavorite(data: CreateFavoriteDto) {
    const result = await bloggingApi.post<SuccessResponseWrapper<Favorite>>(
      "/favorite",
      data,
    );
    return result.data;
  },
  async deleteFavorite(data: RemoveFavoriteDto) {
    const result = await bloggingApi.delete<SuccessResponseWrapper>(
      `/favorite`,
      {
        data,
      },
    );
    return result.data.message;
  },
};

export default favoriteAction;
