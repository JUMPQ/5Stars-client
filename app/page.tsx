"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Layers,
  Clock,
  Calendar,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import Header from "@/components/ui/header";
import Header from "@/components/layout/header";
import Hero from "@/components/features/home/hero";
import Benefits from "@/components/features/home/benefits";
import Setup from "@/components/features/home/setup";
import NewsSection from "@/components/features/home/news";
import FaqSection from "@/components/features/home/faq";
import CtaSection from "@/components/features/home/cta";
import Footer from "@/components/layout/footer";
interface SuccessModalProps {
  onClose: () => void;
}

interface RegistrationModalProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onClose: () => void;
}

function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-[#222] p-8 rounded-xl border border-white/20 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Registration Successful!
        </h2>
        <p className="text-white/80 mb-6">
          Your team has been registered successfully.
        </p>

        <button
          onClick={onClose}
          className="button w-full py-3 text-lg font-semibold"
        >
          Go to Team Dashboard
        </button>
      </div>
    </div>
  );
}

function RegistrationModal({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  error,
  handleSubmit,
  onClose,
}: RegistrationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-start z-50 p-4 pt-20 overflow-y-auto">
      <div className="bg-[#222] p-6 sm:p-8 rounded-xl border border-white/20 max-w-md w-full relative mt-10 mb-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
        >
          ×
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
          Register as Head Coach / Team Manager
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-white/80 mb-1 text-sm sm:text-base"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-[#333] border border-white/20 rounded-xl py-2 sm:py-3 px-4 w-full text-white focus:border-white outline-none transition-all text-sm sm:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-white/80 mb-1 text-sm sm:text-base"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#333] border border-white/20 rounded-xl py-2 sm:py-3 px-4 w-full text-white focus:border-white outline-none transition-all text-sm sm:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-white/80 mb-1 text-sm sm:text-base"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#333] border border-white/20 rounded-xl py-2 sm:py-3 px-4 w-full text-white focus:border-white outline-none transition-all text-sm sm:text-base"
            />
          </div>
          {error && (
            <p className="text-red-500 text-center text-sm sm:text-base">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="button py-3 text-base sm:text-lg font-semibold mt-4"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { theme, setTheme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  //
  const openModal = () => setIsModalOpen(true);
  // Adapted features for 5Stars (football league platform)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = { name, email, password, role: "coach" };

    try {
      const response = await fetch(
        "https://backend.5starsteams.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setName("");
      setEmail("");
      setPassword("");
      setRegistrationSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  //  Handle View Live Matches - Show coming soon toast

  const handleSuccessClose = () => {
    setRegistrationSuccess(false);
    setIsModalOpen(false);
    window.open("https://team.5starsteams.com", "_blank");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setRegistrationSuccess(false);
  };

  const logos = [
    { src: "/loogo.png", alt: "Google" },
    { src: "/logos/meta.svg", alt: "Meta" },
  ];

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Adapted for 5Stars */}
        <Hero onOpenModal={openModal} />
        {/* Features Section - Adapted */}
        <Benefits />
        {/* News Section */}
        <NewsSection />
        {/* How It Works Section - Adapted */}
        <Setup />
        {/* FAQ Section - Adapted */}
        <FaqSection />
        {/* CTA Section - Updated with toast handler */}
        <CtaSection onOpenModal={openModal} />
      </main>
      <Footer onOpenModal={openModal} />

      {/* Render Modals */}
      {isModalOpen && (
        <>
          {registrationSuccess ? (
            <SuccessModal onClose={handleSuccessClose} />
          ) : (
            <RegistrationModal
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isLoading={isLoading}
              error={error}
              handleSubmit={handleSubmit}
              onClose={handleModalClose}
            />
          )}
        </>
      )}
    </div>
  );
}
