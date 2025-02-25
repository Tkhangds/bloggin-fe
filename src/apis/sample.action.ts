import { bloggingApi } from "@/lib/HttpClient/index";
import { Sample } from "@/types/sample";

const sampleAction = {
  async getAllSample(page?: number, limit?: number) {
    const res = await bloggingApi.get<
      BloggingSuccessResponseWrapper<PaginationResponseWrapper<Sample>>
    >("/sample", {
      params: {
        page,
        limit,
      },
    });
    return res;
  },
  async updateSampleById(id: string, data: Sample) {
    const res = await bloggingApi.put<BloggingSuccessResponseWrapper<Sample>>(
      `/sample/${id}`,
      data,
    );
    return res;
  },
};

export default sampleAction;
