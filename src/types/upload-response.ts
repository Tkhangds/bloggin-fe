import z from "zod";

export const UploadResponseSchema = z.object({
  public_id: z.string(),
  secure_url: z.string(),
});

export type UploadResponse = z.infer<typeof UploadResponseSchema>;
