import { bloggingApi } from "@/lib/HttpClient/index";
import { Comment } from "@/types/comment";
import { CreateCommentDto } from "@/types/dtos/create-comment.dto";
import { UpdateCommentDto } from "@/types/dtos/update-comment.dto";

const commentAction = {
  async getAllCommentByPostId(postId: string, page?: number, limit?: number) {
    const res = await bloggingApi.get<PaginationResponseWrapper<Comment[]>>(
      `/comment/post/${postId}`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    console.log(res.data);
    return res.data;
  },
  async createComment(data: CreateCommentDto) {
    const res = await bloggingApi.post<BloggingSuccessResponseWrapper<Comment>>(
      "/comment",
      data,
    );
    return res.data;
  },
  async updateCommentById(id: string, data: UpdateCommentDto) {
    const res = await bloggingApi.patch<
      BloggingSuccessResponseWrapper<Comment>
    >(`/comment/${id}`, data);
    return res.data.data;
  },
  async deleteCommentById(id: string) {
    const res = await bloggingApi.delete<BloggingSuccessResponseWrapper>(
      `/comment/${id}`,
    );
    return res.data.message;
  },
};

export default commentAction;
