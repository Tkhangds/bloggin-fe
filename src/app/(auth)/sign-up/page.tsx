"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, Zap, Users } from "lucide-react";
import { useAuth } from "@/hooks/apis/useAuth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterDto, RegisterSchema } from "@/types/dtos/register.dto";
import { useState } from "react";

export default function SignUpPage() {
  return (
    <>
      <style jsx global>{`
        @keyframes gridFade {
          0% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0.8;
          }
        }
        .animate-grid-fade {
          animation: gridFade 2s infinite;
        }
        .bg-grid-white\/10 {
          background-image:
            linear-gradient(
              to right,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            );
        }
      `}</style>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <SignUpForm />
        </div>
      </div>
    </>
  );
}

function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      displayName: "lakhangdo",
    },
  });

  const {
    control,
    handleSubmit,
    formState: {},
  } = form;

  const { mutateAsync: register } = useAuth().useRegister();
  const onSubmitHandle = async (data: RegisterDto) => {
    data.displayName = data.username;
    console.log(data);
    await register({ data });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmitHandle)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-balance text-muted-foreground">
                  Start your bloggin journey today
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={field.value}
                      onChange={field.onChange}
                      required
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="m@example.com"
                      required
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="password"
                      type="password"
                      value={field.value}
                      onChange={field.onChange}
                      required
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/sign-in" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-primary/20 via-primary/30 to-primary/20 p-8 md:flex">
            <div className="bg-grid-white/10 animate-grid-fade absolute inset-0 bg-[size:20px_20px]"></div>
            <div className="relative z-10 space-y-6 text-center">
              <div className="relative mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20">
                <div className="absolute inset-0 rounded-2xl bg-primary/20 motion-safe:animate-pulse"></div>
                <Rocket className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Get Started Today
              </h2>
              <p className="max-w-sm text-muted-foreground">
                Join our community of writers and start sharing your stories
                with the world.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 rounded-lg bg-background/30 p-4 backdrop-blur-sm">
                  <Zap className="h-8 w-8 shrink-0 text-primary" />
                  <div className="text-left">
                    <h3 className="font-semibold">Quick Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      Get your blog up and running in minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg bg-background/30 p-4 backdrop-blur-sm">
                  <Users className="h-8 w-8 shrink-0 text-primary" />
                  <div className="text-left">
                    <h3 className="font-semibold">Growing Community</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with other writers and readers
                    </p>
                  </div>
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
