"use client";

import { LandingLayout } from "@/components/layouts/landing";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ImageGallery from "@/components/gallery/image-gallery";
import TemplateGallery from "@/components/gallery/template-gallery";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Welcome To Blogging</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function BackgroundPaths({ title = "Welcome To Bloggin" }: { title?: string }) {
  const words = title.split(" ");
  const router = useRouter();
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="mb-8 text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-4 inline-block last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block bg-gradient-to-r from-neutral-900 to-neutral-700/80 bg-clip-text pb-2 text-transparent dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
            {/* White Button */}
            <div className="group relative inline-block w-full max-w-[280px] overflow-hidden rounded-2xl bg-gradient-to-b from-black/5 to-black/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl sm:w-auto">
              <Button
                onClick={() => {
                  router.push("/blog");
                }}
                variant="ghost"
                className="w-full rounded-[1.15rem] border border-black/10 bg-white px-6 py-5 text-base font-semibold text-black backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-lg group-hover:-translate-y-0.5 sm:px-8 sm:py-6 sm:text-lg"
              >
                <span className="opacity-90 transition-opacity group-hover:opacity-100">
                  Explore More
                </span>
                <span className="ml-2 opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                  🕮
                </span>
              </Button>
            </div>

            {/* Black Button */}
            <div className="group relative inline-block w-full max-w-[280px] overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-white/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl sm:w-auto">
              <Button
                onClick={() => {
                  router.push("/draft");
                }}
                variant="ghost"
                className="w-full rounded-[1.15rem] border border-white/10 bg-black px-6 py-5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg group-hover:-translate-y-0.5 sm:px-8 sm:py-6 sm:text-lg"
              >
                <span className="opacity-90 transition-opacity group-hover:opacity-100">
                  Start Writing
                </span>
                <span className="ml-2 text-xl font-extrabold opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                  →
                </span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LandingLayout>
      <BackgroundPaths></BackgroundPaths>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-center gap-28 px-4 py-6 sm:px-6 md:px-8">
        <ImageGallery></ImageGallery>
        <TemplateGallery></TemplateGallery>
        <div>More content incoming</div>
      </div>
    </LandingLayout>
  );
}
