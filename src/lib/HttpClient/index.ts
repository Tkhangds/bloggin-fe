import apiClient from "./api-client";

const bloggingClient = apiClient.getInstance();
export const bloggingApi = bloggingClient.getClient();
