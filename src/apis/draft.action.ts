import { bloggingApi } from "@/lib/HttpClient/index";
import { Draft } from "@/types/draft";
import { CreateDraftDto } from "@/types/dtos/create-draft.dto";
import { UpdateDraftDto } from "@/types/dtos/update-draft.dto";

const draftAction = {
  // async getAllDraftByUserId(authorId: string, page?: number, limit?: number) {
  //   const res =
  //     await bloggingApi.get<BloggingSuccessResponseWrapper<Draft[]>>(
  //       "/draft/all",
  //     );
  //   return res.data.data ?? [];
  // },
  async getDraftById(id: string) {
    const res = await bloggingApi.get<BloggingSuccessResponseWrapper<Draft>>(
      `/draft/${id}`,
    );
    return res.data.data;
  },
  async getAllDraftByUserId(authorId: string) {
    const res = await bloggingApi.get<BloggingSuccessResponseWrapper<Draft[]>>(
      `/draft/author/${authorId}`,
    );
    return res.data.data ?? [];
  },
  async createDraft(data: CreateDraftDto) {
    const res = await bloggingApi.post<BloggingSuccessResponseWrapper<Draft>>(
      "/draft",
      data,
    );
    console.log(res.data);
    return res.data;
  },
  async updateDraftById(id: string, data: UpdateDraftDto) {
    const res = await bloggingApi.put<BloggingSuccessResponseWrapper<Draft>>(
      `/draft/${id}`,
      data,
    );
    return res;
  },
  async deleteDraftById(id: string) {
    const res = await bloggingApi.delete<BloggingSuccessResponseWrapper>(
      `/draft/${id}`,
    );
    return res.data.message;
  },
};

export default draftAction;
