import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import Link from "next/link";

export default function WIPPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <Construction className="h-6 w-6" />
          <span className="sr-only">Company Name</span>
        </Link>
      </header>
      <main className="flex flex-1">
        <section className="flex h-full w-full flex-1 items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {"Coming Soon"}
                </h1>
                <p className="mx-auto max-w-[700px] py-2 text-muted-foreground md:text-xl">
                  {
                    "We're working hard to bring you something amazing. Stay tuned!"
                  }
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex items-center justify-center">
                  <Link className="flex items-center justify-center" href="/">
                    <Button type="submit">Go Back</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
