import axios from "axios";
import HttpException from "@/configs/HttpException";
// Định nghĩa kiểu cho phản hồi lỗi
interface CleanErrorResponseWrapper {
  exceptionCode?: string;
  message?: string;
  details?: unknown;
}

export const errorHandler = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const { response, request, code, config } = error;

    // Xử lý lỗi timeout
    if (code === "ECONNABORTED") {
      console.error("Connection timed out:", config?.url);
      throw new Error("ERR/CONNECTION_TIMEOUT");
    }

    // Xử lý lỗi với phản hồi từ server
    if (response) {
      const data = response.data as CleanErrorResponseWrapper;
      const exceptionCode = data?.exceptionCode;

      // Trả về mã lỗi tùy chỉnh nếu có
      if (exceptionCode) {
        console.error(`Server returned exception code: ${exceptionCode}`);
        throw new HttpException(exceptionCode);
      }

      // Trường hợp không có exceptionCode, trả về message
      if (data?.message) {
        console.error(`Server error message: ${data.message}`);
        throw new Error(data.message);
      }

      // Trường hợp không xác định
      console.error(`Unexpected server error:`, response);
      throw new Error("ERR/UNEXPECTED_SERVER_ERROR");
    }

    // Xử lý lỗi không có phản hồi (network errors)
    if (request) {
      console.error("No response received from server:", request);
      throw new Error("ERR/NO_RESPONSE");
    }

    // Xử lý các lỗi Axios khác
    console.error("Axios error:", error.message);
    throw new Error(error.message || "ERR/AXIOS_ERROR");
  }

  // Xử lý các lỗi không phải Axios
  console.error("Non-Axios error:", error);
  if (error instanceof Error) {
    throw new Error(error?.message || "ERR/UNKNOWN_ERROR");
  } else {
    throw new Error("ERR/UNKNOWN_ERROR");
  }
};
