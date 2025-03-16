import { bloggingApi } from "@/lib/HttpClient/index";
import { LoginDto } from "@/types/dtos/login.dto";
import { RegisterDto } from "@/types/dtos/register.dto";
import { ValidSession } from "@/types/validSession";

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
  async validateToken() {
    const res = await bloggingApi.get<
      BloggingSuccessResponseWrapper<ValidSession>
    >("/auth/validate-token");
    return res.data;
  },
};

export default authAction;
