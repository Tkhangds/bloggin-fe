import { bloggingApi } from "@/lib/HttpClient/index";

const userAction = {
  async updateAvatar(data: File) {
    const formData = new FormData();
    formData.append("file", data);

    const result = await bloggingApi.patch<SuccessResponseWrapper>(
      "/user/avatar",
      formData,
    );

    return result.data;
  },
  async updateUser(data: { displayName: string }) {
    const result = await bloggingApi.patch<SuccessResponseWrapper>(
      "/user",
      data,
    );

    return result.data;
  },
};
export default userAction;
