"use client";

import { LandingLayout } from "@/components/layouts/landing";
import ImageGallery from "@/components/home/gallery/image-gallery";
import TemplateGallery from "@/components/home/gallery/template-gallery";
import BackgroundPaths from "@/components/home/background-path";
import TagSection from "@/components/home/tag-section";
import CTASection from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <LandingLayout>
      <BackgroundPaths></BackgroundPaths>
      <div className="mt-10 flex flex-col items-center justify-center gap-12 px-4 py-6 dark:bg-neutral-950 sm:px-0 md:gap-16 md:px-0 lg:gap-24">
        <ImageGallery></ImageGallery>

        <TagSection></TagSection>
        <TemplateGallery></TemplateGallery>
        <CTASection></CTASection>
      </div>
    </LandingLayout>
  );
}
