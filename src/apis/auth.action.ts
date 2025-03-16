import { bloggingApi } from "@/lib/HttpClient/index";
import { LoginDto } from "@/types/dtos/login.dto";
import { RegisterDto } from "@/types/dtos/register.dto";

const authAction = {
  async login(data: LoginDto) {
    const res = await bloggingApi.post<BloggingSuccessResponseWrapper>(
      "/auth/login",
      data,
    );
    return res.data;
  },
  async register(data: RegisterDto) {
    // Fix this later
    const res = await bloggingApi.post<BloggingSuccessResponseWrapper>(
      "/auth/signin",
      data,
    );
    return res.data;
  },
};

export default authAction;
