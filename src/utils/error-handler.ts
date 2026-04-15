import axios from "axios";
import HttpException from "@/configs/HttpException";

interface CleanErrorResponseWrapper {
  exceptionCode?: string;
  message?: string;
  details?: unknown;
}

export const errorHandler = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const { response, request, code, config } = error;

    // Timeout error
    if (code === "ECONNABORTED") {
      console.error("Connection timed out:", config?.url);
      throw new Error("ERR/CONNECTION_TIMEOUT");
    }

    // Server responded with an error status
    if (response) {
      const data = response.data as CleanErrorResponseWrapper;
      const exceptionCode = data?.exceptionCode;

      // Return custom error code if provided
      if (exceptionCode) {
        console.error(`Server returned exception code: ${exceptionCode}`);
        throw new HttpException(exceptionCode);
      }

      // Fall back to the server's message field
      if (data?.message) {
        console.error(`Server error message: ${data.message}`);
        throw new Error(data.message);
      }

      // Unrecognised response shape
      console.error(`Unexpected server error:`, response);
      throw new Error("ERR/UNEXPECTED_SERVER_ERROR");
    }

    // Request was made but no response was received (network error)
    if (request) {
      console.error("No response received from server:", request);
      throw new Error("ERR/NO_RESPONSE");
    }

    // Other Axios errors
    console.error("Axios error:", error.message);
    throw new Error(error.message || "ERR/AXIOS_ERROR");
  }

  // Non-Axios errors
  console.error("Non-Axios error:", error);
  if (error instanceof Error) {
    throw new Error(error?.message || "ERR/UNKNOWN_ERROR");
  } else {
    throw new Error("ERR/UNKNOWN_ERROR");
  }
};
