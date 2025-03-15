import { bloggingApi } from "@/lib/HttpClient/index";
import { Tag } from "@/types/tag";

const tagAction = {
  // async getAllTags(name?: string, page?: number, limit?: number) {
  async getAllTags(name?: string) {
    const res = await bloggingApi.get<BloggingSuccessResponseWrapper<Tag[]>>(
      "/tag",
      {
        params: {
          name,
        },
      },
    );
    return res.data.data ?? [];
  },
};

export default tagAction;
