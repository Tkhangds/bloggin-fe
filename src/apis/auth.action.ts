import { bloggingApi } from "@/lib/HttpClient/index";
import { LoginDto } from "@/types/dtos/login.dto";
import { RegisterDto } from "@/types/dtos/register.dto";
import { User } from "@/types/user";

const authAction = {
  async login(data: LoginDto) {
    const res = await bloggingApi.post<BloggingSuccessResponseWrapper>(
      "/auth/login",
      data,
    );
    return res.data;
  },
  async register(data: RegisterDto) {
    const res = await bloggingApi.post<BloggingSuccessResponseWrapper>(
      "/auth/register",
      data,
    );
    return res.data;
  },
  async logout() {
    const res =
      await bloggingApi.delete<BloggingSuccessResponseWrapper>("/auth/logout");
    return res.data;
  },
  async me() {
    const res =
      await bloggingApi.get<BloggingSuccessResponseWrapper<User>>("/auth/me");
    return res.data.data;
  },
};

export default authAction;
