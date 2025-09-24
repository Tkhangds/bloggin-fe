import { bloggingApi } from "@/lib/HttpClient";
import { SearchResult } from "@/types/dtos/search-result.dto";

export const SearchAction = {
  async searchAsync(query: string) {
    const result = await bloggingApi.get<SuccessResponseWrapper<SearchResult>>(
      `/search?query=${query}`,
    );

    return result.data.data;
  },
};
