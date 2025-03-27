import { AuthHeader } from "@/components/auth/auth-header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthHeader />
      <div>{children}</div>
    </div>
  );
}
