import { EXCEPTION_CODE } from "./exceptionCode";

class HttpException extends Error {
  constructor(exceptionCode: string) {
    switch (exceptionCode) {
      case EXCEPTION_CODE.ValidationFailed:
        super("Validation failed");
        break;
      case EXCEPTION_CODE.NotFound:
        super("Not found");
        break;
      case EXCEPTION_CODE.Unauthorized:
        super("The session has expired, please login again");
        break;
      case EXCEPTION_CODE.Forbidden:
        super("You don't have permission to access this resource");
        break;
      case EXCEPTION_CODE.InternalServerError:
        super("Something went wrong, please try again later");
        break;
      default:
        super("Something went wrong, please try again later");
        break;
    }
  }
}

export default HttpException;
