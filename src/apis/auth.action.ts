import { bloggingApi } from "@/lib/HttpClient/index";
import { LoginDto } from "@/types/dtos/login.dto";
import { RegisterDto } from "@/types/dtos/register.dto";
import { User } from "@/types/user";

const authAction = {
  async login(data: LoginDto) {
    const result = await bloggingApi.post<SuccessResponseWrapper>(
      "/auth/login",
      data,
    );
    return result.data;
  },
  async register(data: RegisterDto) {
    const result = await bloggingApi.post<SuccessResponseWrapper>(
      "/auth/register",
      data,
    );
    return result.data;
  },
  async logout() {
    const result =
      await bloggingApi.delete<SuccessResponseWrapper>("/auth/logout");
    return result.data;
  },
  async getMe() {
    const result =
      await bloggingApi.get<SuccessResponseWrapper<User>>("/auth/me");
    return result.data.data;
  },
};

export default authAction;
