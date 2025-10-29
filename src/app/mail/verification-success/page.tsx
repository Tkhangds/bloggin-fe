import Link from "next/link";
import Image from "next/image";

export default function VerificationSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl">
        {/* Header spacer */}
        <div className="h-12" />

        {/* Main content */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 duration-500 animate-in fade-in">
            <Image
              src="https://res.cloudinary.com/doqwxh1br/image/upload/v1759372286/Untitled_design_pwbyte.png"
              alt="Brand logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-5xl font-semibold tracking-tight text-foreground text-green-500 delay-100 duration-700 animate-in fade-in md:text-6xl">
            Email verified
          </h1>

          {/* Subheading */}
          <div className="mb-12 flex flex-col gap-2 text-lg font-light text-muted-foreground delay-200 duration-700 animate-in fade-in md:text-xl">
            <span>Your email address has been successfully verified.</span>
            <span>You can now access all features of your account.</span>
          </div>

          {/* CTA Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-sm bg-foreground px-8 py-3 text-base font-light text-background transition-colors delay-300 animate-in fade-in hover:bg-foreground/90"
          >
            Back to Home
          </Link>
        </div>

        {/* Footer spacer */}
        <div className="h-24" />
      </div>
    </main>
  );
}
