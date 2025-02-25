import { ENV } from "@/configs/env";
import { errorHandler } from "@/utils/error-handler";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    raw?: boolean;
    silent?: boolean;
  }
}

export default class apiClient {
  static httpInstance?: apiClient;

  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.API_BASE_URL,
      timeout: 15000,
      withCredentials: true,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => this.handleSuccessResponse(response),
      (error) => this.handleErrorResponse(error)
    );
  }

  public static getInstance(): apiClient {
    if (!apiClient.httpInstance) {
      apiClient.httpInstance = new apiClient();
    }

    return apiClient.httpInstance;
  }

  private handleSuccessResponse(response: AxiosResponse) {
    return response;
  }

  private handleErrorResponse(error: AxiosError) {
    const config = (error.config as AxiosRequestConfig) || {};

    if (config.raw) {
      return Promise.reject(error);
    }

    return Promise.reject(errorHandler(error));
  }

  public getClient() {
    return this.axiosInstance;
  }
}
