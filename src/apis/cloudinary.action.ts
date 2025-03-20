import { bloggingApi } from "@/lib/HttpClient";
import { UploadResponse } from "@/types/upload-response";

const cloudinaryAction = {
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await bloggingApi.post<UploadResponse>(
      "/cloudinary/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return res.data;
  },
  async deleteImage(publicId?: string) {
    if (!publicId) return;

    return "Deleted";
  },
};

export default cloudinaryAction;
