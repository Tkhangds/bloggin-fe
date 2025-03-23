import { bloggingApi } from "@/lib/HttpClient/index";
import { Comment } from "@/types/comment";
import { CreateCommentDto } from "@/types/dtos/create-comment.dto";
import { UpdateCommentDto } from "@/types/dtos/update-comment.dto";

const commentAction = {
  async getAllCommentByPostId(postId: string, page?: number, limit?: number) {
    const result = await bloggingApi.get<PaginationResponseWrapper<Comment[]>>(
      `/comment/post/${postId}`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return result.data;
  },
  async createComment(data: CreateCommentDto) {
    const result = await bloggingApi.post<SuccessResponseWrapper<Comment>>(
      "/comment",
      data,
    );
    return result.data;
  },
  async updateCommentById(id: string, data: UpdateCommentDto) {
    const result = await bloggingApi.patch<SuccessResponseWrapper<Comment>>(
      `/comment/${id}`,
      data,
    );
    return result.data.data;
  },
  async deleteCommentById(id: string) {
    const result = await bloggingApi.delete<SuccessResponseWrapper>(
      `/comment/${id}`,
    );
    return result.data.message;
  },
};

export default commentAction;
