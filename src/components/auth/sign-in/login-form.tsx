"use client";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDto, LoginSchema } from "@/types/dtos/login.dto";
import { useAuth } from "@/hooks/apis/useAuth";
import LoginHero from "./login-hero";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function LoginForm({
  className,
  ...props
}: LoginFormProps): JSX.Element {
  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutateAsync: login } = useAuth().useLogin();

  const [loading] = useState<boolean>(false);
  const [error] = useState<string>("");

  const onSubmitHandle = async (data: LoginDto) => {
    try {
      await login({ data });
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const onGoogleLoginHandle = async () => {
    // Implement Google login logic here
    console.log("Google login clicked");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmitHandle)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Bloggin account
                </p>
              </div>
              {error && (
                <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                  {error}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email/Username</Label>
                <Controller
                  name="identifier"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email or username"
                      placeholder="m@example.com"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.identifier?.message}
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="password"
                      type="password"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.password?.message}
                    />
                  )}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  "Login"
                )}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div>
                <Button
                  type="button"
                  onClick={() => onGoogleLoginHandle()}
                  variant="outline"
                  className="w-full flex-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>

          <LoginHero />
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="/wip">Terms of Service</a> and{" "}
        <a href="/wip">Privacy Policy</a>.
      </div>
    </div>
  );
}
