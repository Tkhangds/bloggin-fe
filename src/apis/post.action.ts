import { bloggingApi } from "@/lib/HttpClient/index";
import { CreatePostDto } from "@/types/dtos/create-post.dto";
import { UpdatePostDto } from "@/types/dtos/update-post.dto";
import { Post } from "@/types/post";

const postAction = {
  async getAllPost(
    page?: number,
    limit?: number,
    title?: string,
    tagName?: string,
  ) {
    console.log("page being fetched: ", page);
    const result = await bloggingApi.get<PaginationResponseWrapper<Post[]>>(
      "/post",
      {
        params: {
          page,
          limit,
          title,
          tagName,
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

  async getPostByAuthor(authorId: string) {
    const result = await bloggingApi.get<PaginationResponseWrapper<Post[]>>(
      `/post/author/${authorId}`,
    );
    return result.data.data;
  },

  async createPost(data: CreatePostDto, thumbnail?: File) {
    const formData = new FormData();

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("authorId", data.authorId);
    data.tags.forEach((tag) => formData.append("tags", tag));

    const result = await bloggingApi.post<SuccessResponseWrapper<Post>>(
      "/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
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
  async getPostAudioByPostId(postId: string, language: string) {
    const result = await bloggingApi.get<SuccessResponseWrapper<string>>(
      `/post/synthesize/${postId}?language=${language}`,
    );
    return result.data.data;
  },
};

export default postAction;
