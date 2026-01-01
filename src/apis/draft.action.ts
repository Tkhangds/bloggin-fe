import { bloggingApi } from "@/lib/HttpClient/index";
import { Draft } from "@/types/draft";
import { CreateDraftDto } from "@/types/dtos/create-draft.dto";
import { UpdateDraftDto } from "@/types/dtos/update-draft.dto";

const draftAction = {
  async getDraftById(draftId: string) {
    const result = await bloggingApi.get<SuccessResponseWrapper<Draft>>(
      `/draft/${draftId}`,
    );
    return result.data.data;
  },
  async getAllDraftByUserId(page?: number, limit?: number) {
    const result = await bloggingApi.get<PaginationResponseWrapper<Draft[]>>(
      `/draft/author`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return result.data.data;
  },
  async getCollaboratedDrafts(page?: number, limit?: number) {
    const result = await bloggingApi.get<PaginationResponseWrapper<Draft[]>>(
      `/draft/collaborated`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return result.data.data;
  },
  async createDraft(data: CreateDraftDto) {
    const result = await bloggingApi.post<SuccessResponseWrapper<Draft>>(
      "/draft",
      data,
    );
    return result.data;
  },
  async updateDraftById(draftId: string, data: UpdateDraftDto) {
    const result = await bloggingApi.put<SuccessResponseWrapper<Draft>>(
      `/draft/${draftId}`,
      data,
    );
    return result;
  },
  async deleteDraftById(draftId: string) {
    const result = await bloggingApi.delete<SuccessResponseWrapper>(
      `/draft/${draftId}`,
    );
    return result.data.message;
  },
};

export default draftAction;
