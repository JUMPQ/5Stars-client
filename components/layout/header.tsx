"use client";
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Star,
  Zap,
  Clock,
  Calendar,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface HeaderProps {
  onOpenRegistrationModal?: () => void; // ← NEW
}

const Header = ({ onOpenRegistrationModal }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FOR:Shared coming-soon toast (used by all "Browse" and "Live" buttons)
  const showComingSoonToast = (feature: "live" | "fixtures") => {
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-w-sm p-6 mx-auto overflow-hidden text-white border shadow-2xl bg-linear-to-r from-yellow-500 to-orange-500 rounded-2xl border-white/20 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex items-start space-x-4">
            <div className="pt-1 shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="mb-1 text-lg font-bold">Coming Soon!</h3>
              <p className="text-sm opacity-90">
                {feature === "live"
                  ? "Live match tracking is launching very soon. Stay tuned for real-time scores and updates!"
                  : "Fits and Match is coming soon. Get ready to explore the catalogue!"}
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="ml-2 transition-colors shrink-0 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-white/30 to-transparent" />
        </motion.div>
      ),
      {
        duration: 5000,
        position: "top-right",
      },
    );
  };

  return (
    <div>
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container w-[95%] mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="flex items-center justify-center rounded-lg text-primary-foreground">
              <Link href="/">
                <Image
                  src="/5Stars.png"
                  alt="5Stars Logo"
                  width={122}
                  height={122}
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="items-center hidden gap-2 lg:flex">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 px-4 text-sm font-medium transition-all rounded-full hover:bg-primary/5"
              onClick={() => showComingSoonToast("fixtures")}
            >
              <Zap className="w-4 h-4 mr-2" />
              Browse Fits and Match
            </Button>
            <Link
              href="https://fivescores.com"
              className="flex items-center h-10 px-4 text-sm font-medium transition-all rounded-full hover:bg-primary/5"
            >
              <Clock className="w-4 h-4 mr-2" />
              View Live Matches
            </Link>
            <Link
              className="flex items-center h-10 px-4 text-sm font-medium transition-all rounded-full hover:bg-primary/5"
              href="https://fivescores.com/competitions/season/ldOIi4sSzKhBY8mBaezC"
            >
              <Star className="w-4 h-4 mr-2" /> CSL
            </Link>
          </div>
          <div className="items-center hidden gap-4 lg:flex">
            <Link
              href="https://team.5Starsteams.com"
              target="_blank"
              className="flex items-center px-4 text-sm font-medium text-white transition-colors rounded-md bg-destructive hover:bg-destructive/90 h-11"
            >
              Visit Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-0 border-b lg:hidden top-16 bg-background/95 backdrop-blur-lg z-80"
          >
            <div className="container w-[95%] mx-auto py-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2 pb-4 border-b border-border/20">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start h-12 px-4 text-left"
                  onClick={() => showComingSoonToast("fixtures")}
                >
                  <Zap className="w-5 h-5 mr-3 shrink-0" />
                  Browse Fits and Match
                </Button>
                <Link
                  href="https://fivescores.com"
                  className="flex items-center h-10 gap-3 px-4 text-sm font-medium transition-all rounded-full hover:bg-primary/5"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  View Live Matches
                </Link>
                <Link
                  className="flex items-center h-10 gap-3 px-4 text-sm font-medium transition-all rounded-full hover:bg-primary/5"
                  href="https://fivescores.com/competitions/season/ldOIi4sSzKhBY8mBaezC"
                >
                  <Star className="w-4 h-4 mr-2" /> CSL
                </Link>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link
                  href="https://team.5Starsteams.com"
                  target="_blank"
                  className="py-2 text-sm font-medium"
                >
                  Visit Team Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Toast Container */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        visibleToasts={1}
        toastOptions={{
          className: "backdrop-blur-lg",
          style: {
            color: "hsl(var(--foreground))",
          },
        }}
      />
    </div>
  );
};

export default Header;
