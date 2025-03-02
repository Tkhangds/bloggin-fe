"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, LucidePlay } from "lucide-react";

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title: string;
}

export default function ImageGallery(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  const images: ImageItem[] = [
    {
      id: 0,
      src: "https://placehold.co/1200x800/png",
      alt: "Image 1",
      title: "Home",
    },
    {
      id: 1,
      src: "https://placehold.co/1200x800/png",
      alt: "Image 2",
      title: "For You",
    },
    {
      id: 2,
      src: "https://placehold.co/1200x800/png",
      alt: "Image 2",
      title: "Blog",
    },
    {
      id: 3,
      src: "https://placehold.co/1200x800/png",
      alt: "Image 3",
      title: "Text Editor",
    },
    {
      id: 4,
      src: "https://placehold.co/1200x800/png",
      alt: "Image 5",
      title: "Your Post",
    },
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isAutoRotating) {
      intervalId = setInterval(() => {
        setSelectedImage((current) => (current + 1) % images.length);
      }, 3500);
    }

    // Clean up interval on component unmount or when auto-rotation is turned off
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoRotating, images.length]);

  // Handle image selection
  const handleImageSelect = (id: number): void => {
    setSelectedImage(id);
    // Optionally uncomment the line below if you want manual selection to pause auto-rotation
    // setIsAutoRotating(false);
  };

  // Toggle auto-rotation
  const toggleAutoRotation = (): void => {
    setIsAutoRotating((prev) => !prev);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center space-y-6 bg-transparent p-4">
      <div className="w-full text-left">
        <h1 className="mb-2 w-full text-left text-3xl font-bold tracking-tight md:text-5xl">
          Explore our feature.
        </h1>
        <h3 className="text-1xl font-thin- mb-4 w-full text-left tracking-tight md:text-2xl">
          Write, edit, publish, and connect—all in one place.
        </h3>
      </div>

      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted shadow-xl">
        <Image
          src={images[selectedImage].src}
          alt={images[selectedImage].alt}
          width={1200}
          height={800}
          className="object-cover object-center shadow-lg transition-opacity duration-300"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
      </div>

      {/* Buttons */}
      <div className="flex w-full flex-wrap justify-center gap-2">
        {images.map((image) => (
          <Button
            key={image.id}
            variant={selectedImage === image.id ? "default" : "outline"}
            className={cn(
              "h-auto py-2",
              selectedImage === image.id && "ring-2 ring-primary",
            )}
            onClick={() => handleImageSelect(image.id)}
          >
            {image.title}
          </Button>
        ))}

        {/* Auto-rotation toggle button */}
        <Button
          size={"sm"}
          variant="outline"
          className={cn("ml-2 h-auto py-2", isAutoRotating && "bg-primary/10")}
          onClick={toggleAutoRotation}
        >
          {isAutoRotating ? <Pause /> : <LucidePlay />}
        </Button>
      </div>
    </div>
  );
}
