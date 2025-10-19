export enum VerificationProblemsEnum {
  TOKEN_INVALID = "It seems like the verification mail is either invalid or has expired. Please try again sometime later.",
  USER_NOT_FOUND = "The user associated with this verification link could not be found. Please ensure you are using the correct link or contact support for assistance.",
  USER_ALREADY_VERIFIED = "Your email address has already been verified. If you believe this is an error, please contact support for further assistance.",
  UNEXPECTED_ERROR = "An unexpected error occurred during email verification. Please try again later or contact support for assistance.",
}
