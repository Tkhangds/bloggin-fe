import { bloggingApi } from "@/lib/HttpClient/index";
import { Favorite } from "@/types/favorite";
import { CreateFavoriteDto } from "@/types/dtos/create-favorite.dto";
import { RemoveFavoriteDto } from "@/types/dtos/remove-favorite.dto";

// WIP

const favoriteAction = {
  async getFavorite(page?: number, limit?: number) {
    const res = await bloggingApi.get<PaginationResponseWrapper<Favorite[]>>(
      `/favorite`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res.data.data;
  },
  async createFavorite(data: CreateFavoriteDto) {
    const res = await bloggingApi.post<
      BloggingSuccessResponseWrapper<Favorite>
    >("/favorite", data);
    return res.data;
  },
  async deleteFavorite(data: RemoveFavoriteDto) {
    const res = await bloggingApi.delete<BloggingSuccessResponseWrapper>(
      `/favorite`,
      {
        data,
      },
    );
    return res.data.message;
  },
};

export default favoriteAction;
