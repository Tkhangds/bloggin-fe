import { Rocket, Zap, Users } from "lucide-react";

export default function RegisterHero() {
  return (
    <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-primary/20 via-primary/30 to-primary/20 p-8 md:flex">
      <div className="bg-grid-white/10 animate-grid-fade absolute inset-0 bg-[size:20px_20px]"></div>
      <div className="relative z-10 space-y-6 text-center">
        <div className="relative mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20">
          <div className="absolute inset-0 rounded-2xl bg-primary/20 motion-safe:animate-pulse"></div>
          <Rocket className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Get Started Today</h2>
        <p className="max-w-sm text-muted-foreground">
          Join our community of writers and start sharing your stories with the
          world.
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
  );
}
