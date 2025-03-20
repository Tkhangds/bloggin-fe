import { bloggingApi } from "@/lib/HttpClient/index";
import { CreatePostDto } from "@/types/dtos/create-post.dto";
import { UpdatePostDto } from "@/types/dtos/update-post.dto";
import { Post } from "@/types/post";

const postAction = {
  async getAllPost(page?: number, limit?: number) {
    const res = await bloggingApi.get<PaginationResponseWrapper<Post[]>>(
      "/post/all",
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res.data;
  },
  async getPostById(id: string) {
    const res = await bloggingApi.get<BloggingSuccessResponseWrapper<Post>>(
      `/post/${id}`,
    );
    return res.data.data;
  },
  async getPostByAuthor() {
    const res =
      await bloggingApi.get<PaginationResponseWrapper<Post[]>>(`/post/author`);
    return res.data.data;
  },
  async createPost(data: CreatePostDto) {
    const res = await bloggingApi.post<BloggingSuccessResponseWrapper<Post>>(
      "/post",
      data,
    );

    return res.data.data;
  },
  async updatePostById(id: string, data: UpdatePostDto) {
    const res = await bloggingApi.patch<BloggingSuccessResponseWrapper<Post>>(
      `/post/${id}`,
      data,
    );
    return res;
  },
  async deletePostById(id: string) {
    const res = await bloggingApi.delete<BloggingSuccessResponseWrapper>(
      `/post/${id}`,
    );
    return res.data.message;
  },
};

export default postAction;
