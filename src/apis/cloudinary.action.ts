import { bloggingApi } from "@/lib/HttpClient";
import { UploadResponse } from "@/types/image-response";

const cloudinaryAction = {
  async uploadImage(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await bloggingApi.post<UploadResponse>(
        "/cloudinary/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return result.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
  async deleteImage(publicId?: string) {
    if (!publicId) return;
    return "Deleted";
  },
};

export default cloudinaryAction;
