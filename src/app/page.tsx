import BackgroundPaths from "@/components/home/background-path/background-path";
import { LandingLayout } from "@/components/layouts/landing";
import Loading from "@/components/loading/loading";
import dynamic from 'next/dynamic';

const ImageGallery     = dynamic(() => import('@/components/home/gallery/image-gallery'), { ssr: false, loading: () => <Loading /> })
const TagSection       = dynamic(() => import('@/components/home/tag-section'),       { ssr: false, loading: () => <Loading /> })
const TemplateGallery  = dynamic(() => import('@/components/home/gallery/template-gallery'), { ssr: false, loading: () => <Loading /> })
const CTASection       = dynamic(() => import('@/components/home/cta-section'), { ssr: false, loading: () => <Loading /> })

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
