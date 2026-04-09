"use client";
import Header from "@/components/ui/header";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const EventsPage = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <section
          className="relative h-[calc(100vh-64px)] overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/Hero-Image.png')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className=" relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-6 max-w-4xl"
            >
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/80">
                Upcoming Events
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold sm:text-5xl">
                Join us for unforgettable moments, live experiences, and
                <span className="text-red-600"> community connections.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
                Discover curated events designed to inspire, entertain, and
                bring people together.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 5VIES STAR MAGAZINE SECTION */}
        <section>
          <div className="container  w-[95%] mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-center">
              5ive times magazine
            </h2>
            <h3 className="text-xl font-semibold text-center mb-4">
              match new & highlights
            </h3>
            <div className="border overflow-hidden rounded-2xl  border-gray-200 shadow-md">
              <div className="relative w-full overflow-hidden rounded-t-2xl bg-black">
                {!playVideo ? (
                  <>
                    {/* Thumbnail */}
                    <Image
                      width={1800}
                      height={900}
                      src="/thumbnail-img.png"
                      alt="Football training video preview"
                      className=" w-full object-cover object-center"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Play button */}
                    <button
                      onClick={() => setPlayVideo(true)}
                      className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:scale-105"
                      aria-label="Play video"
                    >
                      <Play className="ml-1 size-7 fill-white" />
                    </button>
                  </>
                ) : (
                  <video
                    controls
                    autoPlay
                    onEnded={() => setPlayVideo(false)}
                    className=" w-full "
                  >
                    <source src="/promotion-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="flex flex-col items-center h-75 justify-center">
                <h2 className="text-center mb-4 uppercase font-bold  lg:text-4xl">
                  Corporate stars league 2026 is here
                </h2>
                <p className="text-center mb-4 max-w-xl">
                  We went from drafting deadlines emails,paying courtsey calls
                  to drafting the ultimate starting XI.
                </p>
                <p className="text-center">
                  LAGOS, HERE IS YOUR 2026 CSL ROSTER!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EventsPage;
