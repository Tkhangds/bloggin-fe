"use client";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SplitText from "@/components/ui/split-text";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDto, LoginSchema } from "@/types/dtos/login.dto";
import { useAuth } from "@/hooks/apis/useAuth";

export default function LoginPage(): JSX.Element {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function LoginForm({ className, ...props }: LoginFormProps): JSX.Element {
  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: {},
  } = form;

  const { mutateAsync: login } = useAuth().useLogin();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/"); // Redirect to dashboard if already logged in
    }
  }, [router]);

  const onSubmitHandle = async (data: LoginDto) => {
    await login({ data });
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
                      required
                      value={field.value}
                      onChange={field.onChange}
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
                      required
                      value={field.value}
                      onChange={field.onChange}
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

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="magicpattern relative hidden flex-col items-center justify-center overflow-hidden from-primary/20 to-primary/40 p-8 md:flex">
            <div className="bg-grid-white/10 animate-grid-fade absolute inset-0 bg-[size:20px_20px]"></div>
            <div className="relative z-10 space-y-6 text-center">
              <SplitText
                text="Start Your Bloggin Journey"
                className="text-center text-2xl font-semibold"
                delay={100}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                threshold={0.2}
                rootMargin="-50px"
                onLetterAnimationComplete={() => {}}
              />
              <p className="max-w-sm text-muted-foreground">
                Share your ideas with the world. Create beautiful, engaging
                content that connects with your audience.
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary delay-300"></span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary delay-700"></span>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="m5 12 5 5 9-9"></path>
                  </svg>
                  <span>Intuitive editor</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="m5 12 5 5 9-9"></path>
                  </svg>
                  <span>Connect with Thousands</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="m5 12 5 5 9-9"></path>
                  </svg>
                  <span>Analytics dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
