"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background px-4">
      <h2 className="text-2xl font-bold text-primary">Something went wrong</h2>
      <p className="max-w-md text-center text-muted-foreground">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
