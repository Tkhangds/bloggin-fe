"use client";

import { LandingLayout } from "@/components/layouts/landing";
import ImageGallery from "@/components/gallery/image-gallery";
import TemplateGallery from "@/components/gallery/template-gallery";
import BackgroundPaths from "@/components/home/background-path";

export default function HomePage() {
  return (
    <LandingLayout>
      <BackgroundPaths></BackgroundPaths>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-center gap-24 px-4 py-6 dark:bg-neutral-950 sm:px-6 md:px-8">
        <ImageGallery></ImageGallery>
        <TemplateGallery></TemplateGallery>
        <div>More content incoming</div>
      </div>
    </LandingLayout>
  );
}
