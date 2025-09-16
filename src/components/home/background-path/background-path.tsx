import { Button } from "../../ui/button";
import Link from "next/link";

import "./style.css";

export default function BackgroundPaths({
  title = "Welcome To Bloggin",
}: {
  title?: string;
}) {
  const words = title.split(" ");
  const subtitleWords = "Where stories connect and ideas thrive.".split(" ");

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <div className="fade-in-2s mx-auto max-w-4xl">
          <h1 className="mb-1 text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-4 inline-block last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className="animate-drop-in inline-block bg-gradient-to-r from-neutral-900 to-neutral-700/80 bg-clip-text pb-2 text-transparent dark:from-white dark:to-white/80"
                    style={{
                      animationDelay: `${wordIndex * 0.1 + letterIndex * 0.03}s`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <h1 className="mb-8 text-xl font-semibold tracking-tighter sm:text-xl md:text-2xl">
            {subtitleWords.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-2 inline-block last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className="animate-drop-in inline-block bg-gradient-to-r from-neutral-900 to-neutral-700/95 bg-clip-text pb-2 text-transparent drop-shadow-[0_2px_4px_rgba(255,255,255,1)] dark:from-white dark:to-white/80"
                    style={{
                      animationDuration: "0.4s",
                      animationDelay: `${wordIndex * 0.05 + letterIndex * 0.02}s`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
            {/* White Button */}
            <div className="group relative inline-block w-full max-w-[280px] overflow-hidden rounded-2xl bg-gradient-to-b from-black/5 to-black/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl sm:w-auto">
              <Link href="/blog" passHref>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full rounded-[1.15rem] border border-black/10 bg-white px-6 py-5 text-base font-semibold text-black backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-lg group-hover:-translate-y-0.5 sm:px-8 sm:py-6 sm:text-lg"
                >
                  <span>
                    <span className="opacity-90 transition-opacity group-hover:opacity-100">
                      Explore More
                    </span>
                    <span className="ml-2 opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                      🕮
                    </span>
                  </span>
                </Button>
              </Link>
            </div>

            {/* Black Button */}
            <div className="group relative inline-block w-full max-w-[280px] overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-white/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl sm:w-auto">
              <Link href="/draft" passHref>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full rounded-[1.15rem] border border-white/10 bg-black px-6 py-5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg group-hover:-translate-y-0.5 sm:px-8 sm:py-6 sm:text-lg"
                >
                  <span>
                    <span className="opacity-90 transition-opacity group-hover:opacity-100">
                      Start Writing
                    </span>
                    <span className="ml-2 text-xl font-extrabold opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                      →
                    </span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
