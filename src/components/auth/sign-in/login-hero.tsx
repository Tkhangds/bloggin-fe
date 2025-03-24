import SplitText from "@/components/ui/split-text";

export default function LoginHero(): JSX.Element {
  return (
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
          Share your ideas with the world. Create beautiful, engaging content
          that connects with your audience.
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
  );
}
