import { bloggingApi } from "@/lib/HttpClient/index";
import { CreatePostDto } from "@/types/dtos/create-post.dto";
import { UpdatePostDto } from "@/types/dtos/update-post.dto";
import { Post } from "@/types/post";

const postAction = {
  async getAllPost(page?: number, limit?: number) {
    const result = await bloggingApi.get<PaginationResponseWrapper<Post[]>>(
      "/post/all",
      {
        params: {
          page,
          limit,
        },
      },
    );
    return result.data;
  },
  async getPostById(postId: string) {
    const result = await bloggingApi.get<SuccessResponseWrapper<Post>>(
      `/post/${postId}`,
    );
    return result.data.data;
  },
  async getPostByAuthor() {
    const result =
      await bloggingApi.get<PaginationResponseWrapper<Post[]>>(`/post/author`);
    return result.data.data;
  },
  async createPost(data: CreatePostDto) {
    const result = await bloggingApi.post<SuccessResponseWrapper<Post>>(
      "/post",
      data,
    );

    return result.data.data;
  },
  async updatePostById(postId: string, data: UpdatePostDto) {
    const result = await bloggingApi.patch<SuccessResponseWrapper<Post>>(
      `/post/${postId}`,
      data,
    );
    return result;
  },
  async deletePostById(postId: string) {
    const result = await bloggingApi.delete<SuccessResponseWrapper>(
      `/post/${postId}`,
    );
    return result.data.message;
  },
};

export default postAction;
