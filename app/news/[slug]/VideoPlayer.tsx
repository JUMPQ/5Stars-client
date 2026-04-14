// app/news/[slug]/VideoPlayer.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  thumbnail: string;
  videoSrc: string;
  title: string;
}

export default function VideoPlayer({ thumbnail, videoSrc, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black shadow-lg">
      {isPlaying ? (
        <video
          controls
          autoPlay
          className="w-full aspect-video object-cover"
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          <Image
            src={thumbnail}
            alt={title}
            width={1800}
            height={900}
            className="w-full aspect-video object-cover"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Play Button */}
          <button
            onClick={handlePlay}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-xl hover:scale-110 transition-transform duration-300 z-10"
            aria-label="Play video"
          >
            <Play className="ml-1 size-10 fill-white" />
          </button>
        </>
      )}
    </div>
  );
}