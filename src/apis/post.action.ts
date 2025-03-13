import { bloggingApi } from "@/lib/HttpClient/index";
import { Post } from "@/types/post";

const postAction = {
  // async getAllPost(page?: number, limit?: number) {
  async getAllPost() {
    const res =
      await bloggingApi.get<BloggingSuccessResponseWrapper<Post[]>>(
        "/post/all",
      );
    return res.data.data ?? [];
  },
  async getPostById(id: string) {
    const res = await bloggingApi.get<BloggingSuccessResponseWrapper<Post>>(
      `/post/${id}`,
    );
    return res.data.data;
  },
  async createPost(data: Post) {
    const res = await bloggingApi.post<BloggingSuccessResponseWrapper<Post>>(
      "/post",
      data,
    );
    return res;
  },
  async updatePostById(id: string, data: Post) {
    const res = await bloggingApi.put<BloggingSuccessResponseWrapper<Post>>(
      `/post/${id}`,
      data,
    );
    return res;
  },
  async deletePostById(id: string) {
    const res = await bloggingApi.delete<BloggingSuccessResponseWrapper<Post>>(
      `/post/${id}`,
    );
    return res;
  },
};

export default postAction;
