"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, Zap, Users } from "lucide-react";

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
          animation: gridFade 8s infinite;
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
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <SignUpForm />
        </div>
      </div>
    </>
  );
}

function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-balance">
                  Start your bloggin journey today
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
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
          <div className="from-primary/20 via-primary/30 to-primary/20 relative hidden flex-col items-center justify-center overflow-hidden bg-gradient-to-tl p-8 md:flex">
            <div className="bg-grid-white/10 animate-grid-fade absolute inset-0 bg-[size:20px_20px]"></div>
            <div className="relative z-10 space-y-6 text-center">
              <div className="bg-primary/20 relative mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl">
                <div className="bg-primary/20 absolute inset-0 animate-ping rounded-2xl"></div>
                <Rocket className="text-primary h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Get Started Today
              </h2>
              <p className="text-muted-foreground max-w-sm">
                Join our community of writers and start sharing your stories
                with the world.
              </p>
              <div className="space-y-4 pt-4">
                <div className="bg-background/30 flex items-center gap-4 rounded-lg p-4 backdrop-blur-sm">
                  <Zap className="text-primary h-8 w-8 shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold">Quick Setup</h3>
                    <p className="text-muted-foreground text-sm">
                      Get your blog up and running in minutes
                    </p>
                  </div>
                </div>
                <div className="bg-background/30 flex items-center gap-4 rounded-lg p-4 backdrop-blur-sm">
                  <Users className="text-primary h-8 w-8 shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold">Growing Community</h3>
                    <p className="text-muted-foreground text-sm">
                      Connect with other writers and readers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-balance text-center text-xs [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
