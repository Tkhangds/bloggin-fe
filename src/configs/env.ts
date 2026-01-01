import * as z from "zod";
import "dotenv/config";

const createEnv = () => {
  const EnvSchema = z.object({
    NEXT_PUBLIC_API_BASE_URL: z.string(),
    NEXT_PUBLIC_WS_URL: z.string().optional(),
  });

  const envVars = {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n")}
  `,
    );
  }

  return parsedEnv.data ?? {};
};

export const ENV = createEnv();
