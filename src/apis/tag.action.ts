import { bloggingApi } from "@/lib/HttpClient/index";
import { Tag } from "@/types/tag";

const tagAction = {
  async getAllTags(name?: string, page?: number, limit?: number) {
    const result = await bloggingApi.get<PaginationResponseWrapper<Tag[]>>(
      "/tag",
      { params: { name, page, limit } },
    );
    return result.data.data;
  },
};

export default tagAction;
