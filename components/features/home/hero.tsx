import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="w-full overflow-hidden">
      <div className="relative">
        {/* Background Image (NO animation) */}
        <div className="h-125 relative w-full md:h-150">
          <Image
            src={"/hero-image.jpg"}
            priority
            width={1280}
            height={720}
            alt=""
            className="absolute w-full h-full object-cover object-center"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Text Content (ANIMATED) */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container w-[95%] mx-auto flex flex-col items-start text-left">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 text-white">
                Join the
                <span className="text-primary font-extrabold"> 5Stars</span>
                Football Leagues
              </h1>

              <p className="text-lg md:text-xl mb-8 text-white">
                The ultimate platform for grassroots football in Nigeria.
                Register your team, manage players, track live scores, and
                compete in exciting tournaments.
              </p>

              <div className="flex sm:flex-row gap-4">
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