import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { newsArticles } from "@/lib/news-data";
import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const NewsSection = () => {
  const [playVideo, setPlayVideo] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();

  const pluginRef = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
    }),
  );

  const slides = newsArticles;

  const handlePlayVideo = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setPlayVideo(id);
    pluginRef.current.stop?.();
  };

  const handleVideoEnd = () => {
    setPlayVideo(null);
    setTimeout(() => {
      pluginRef.current.play?.();
    }, 300);
  };

  // Handle slide change
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setPlayVideo(null);
      pluginRef.current.play?.();
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="bg-muted py-20">
      <div className="container w-[95%] px-6 mx-auto">
        {/* Animated Heading - Same style as Setup.tsx */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center sm:text-3xl md:text-5xl uppercase">
            5ive times <span className="text-primary">magazine</span>
          </h2>
        </motion.div>

        {/* Animated Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Carousel
            setApi={setApi}
            plugins={[pluginRef.current]}
            opts={{
              align: "start",
              loop: true,
              dragFree: false,
            }}
            className="w-full"
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={slide.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/news/${slide.slug}`}
                      className="block group"
                      onClick={(e) => {
                        if (playVideo === slide.id) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <div className="overflow-hidden flex flex-col gap-10 lg:flex-row cursor-pointer">
                        {/* Media Section */}
                        <div className="relative w-full overflow-hidden bg-black lg:w-1/2 rounded-lg">
                          {slide.isVideo ? (
                            playVideo === slide.id ? (
                              <video
                                controls
                                autoPlay
                                onEnded={handleVideoEnd}
                                className="w-full h-100 lg:h-96 object-cover"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <source src={slide.video} type="video/mp4" />
                              </video>
                            ) : (
                              <>
                                <Image  
                                  width={1800}
                                  height={900}
                                  src={slide.thumbnail}
                                  alt={`${slide.title} video preview`}
                                  className="w-full h-100 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                                  priority={slide.id === 1}
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                                <button
                                  onClick={(e) => handlePlayVideo(e, slide.id)}
                                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:scale-110 transition z-20"
                                  aria-label="Play video"
                                >
                                  <Play className="ml-1 size-8 fill-white" />
                                </button>
                              </>
                            )
                          ) : (
                            <Image
                              width={1800}
                              height={900}
                              src={slide.thumbnail}
                              alt={slide.title}
                              className="w-full h-100 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col justify-center lg:w-1/2 py-4">
              

                          <h2 className="mb-4 uppercase font-bold text-3xl lg:text-5xl">
                            {slide.title}{" "}
                            <span className="text-primary">
                              {slide.highlight}
                            </span>
                          </h2>

                          <p className="text-muted-foreground mb-6 max-w-xl line-clamp-3">
                            {slide.description}
                          </p>

                          <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                            Read Full Story
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="right-4 top-1/2 -translate-y-1/2 bg-accent" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
