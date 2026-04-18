import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="w-full overflow-hidden">
      <div className="relative">
        {/* Background Image (NO animation) */}
        <div className="relative w-full h-125 md:h-150">
          <Image
            src={"/hero-image.JPG"}
            priority
            width={1280}
            height={720}
            alt=""
            className="absolute object-cover object-center w-full h-full"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-black/50" />

        {/* Text Content (ANIMATED) */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container w-[95%] mx-auto flex flex-col items-start text-left">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl"
            >
              <h1 className="mb-6 text-4xl font-extrabold tracking-tighter text-white md:text-6xl lg:text-7xl">
                Join the
                <span className="font-extrabold text-primary"> 5Stars</span>
                Football Leagues
              </h1>

              <p className="mb-8 text-lg text-white md:text-xl">
                The ultimate platform for grassroots football in Nigeria.
                Register your team, manage players, track live scores, and
                compete in exciting tournaments.
              </p>

              <div className="flex gap-4 sm:flex-row">
                <Button
                  size="default"
                  className="h-12 text-base"
                  onClick={onOpenModal}
                >
                  Become a Coach
                  <ArrowRight className="ml-2 size-4" />
                </Button>

                <Button
                  size="default"
                  variant="glass"
                  className="h-12 text-base"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;