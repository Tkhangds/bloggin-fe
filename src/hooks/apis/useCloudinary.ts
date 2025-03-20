"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import cloudinaryAction from "@/apis/cloudinary.action";

export const useCloudinary = () => {
  const queryClient = useQueryClient();

  const useUploadImage = () => {
    return useMutation({
      mutationFn: (file: File) => {
        return cloudinaryAction.uploadImage(file);
      },
    });
  };

  const useDeleteImage = () => {
    return useMutation({
      mutationFn: (publicId: string) => {
        return cloudinaryAction.deleteImage(publicId);
      },
    });
  };

  return {
    queryClient,
    useUploadImage,
    useDeleteImage,
  };
};
