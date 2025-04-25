"use client";

import AnimatedContent from "../ui/animated-content";
import { Button } from "../ui/button";

export default function CTASection() {
  return (
    <section className="relative mx-auto flex w-full items-center justify-center bg-neutral-200 px-[-1rem] py-12 dark:bg-black md:py-24 lg:py-28">
      <div className="absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-white to-neutral-200 dark:from-neutral-950 dark:to-black"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-neutral-200 to-white dark:from-black dark:to-neutral-950"></div>
      <div className="container flex w-full max-w-5xl flex-col items-center justify-center px-4 md:px-6">
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={true}
          config={{ tension: 100, friction: 30 }}
          animateOpacity
          scale={0.8}
          threshold={0.2}
          delay={100}
        >
          <h1 className="mb-4 w-full text-center text-2xl font-bold tracking-tight text-[#171717] dark:text-white md:text-3xl">
            Sign up now and start your journey with us!
          </h1>
        </AnimatedContent>
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          config={{ tension: 100, friction: 10 }}
          animateOpacity
          scale={0.8}
          threshold={0.2}
          delay={100}
        >
          <Button
            variant={"default"}
            size={"lg"}
            className="flex items-center justify-center px-8 py-6"
          >
            <h1 className="flex w-full items-center justify-center text-center text-base font-bold tracking-tight text-white dark:text-[#171717] md:text-xl">
              Start Writing!
            </h1>
          </Button>
        </AnimatedContent>
      </div>
    </section>
  );
}
