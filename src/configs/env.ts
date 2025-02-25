import * as z from "zod";
import "dotenv/config";

const createEnv = () => {
  const EnvSchema = z.object({
    API_BASE_URL: z.string(),
  });

  const envVars = {
    API_BASE_URL: process.env.API_BASE_URL,
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
