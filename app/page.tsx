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
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-[#222] p-6 sm:p-8 rounded-xl border border-white/20 max-w-md w-full relative">
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Adapted features for 5Stars (football league platform)
  const features = [
    {
      title: "Team Management",
      description: "Manage your roster, players, and team details efficiently.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Live Scoring",
      description: "Track real-time scores, fixtures, and match updates.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Competition Analytics",
      description: "Get insights into team performance and league standings.",
      icon: <BarChart className="size-5" />,
    },
    {
      title: "Secure Registration",
      description: "Register as a coach or manager with secure authentication.",
      icon: <Shield className="size-5" />,
    },
    {
      title: "Integration with Socials",
      description: "Share highlights and connect with fans via social media.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "24/7 Support",
      description: "Get help from our team for any league-related queries.",
      icon: <Star className="size-5" />,
    },
  ];

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

  // Handle View Live Matches - Show coming soon toast
  const handleViewLiveMatches = () => {
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-linear-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-2xl border border-white/20 max-w-sm mx-auto backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex items-start space-x-4">
            <div className="shrink-0 pt-1">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold mb-1">Coming Soon!</h3>
              <p className="text-sm opacity-90">
                Live match tracking is launching very soon. Stay tuned for
                real-time scores and updates!
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="ml-2 shrink-0 text-white/70 hover:text-white transition-colors"
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

  const showComingSoonToast = (feature: "live" | "fixtures") => {
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-linear-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-2xl border border-white/20 max-w-sm mx-auto backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex items-start space-x-4">
            <div className="shrink-0 pt-1">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold mb-1">Coming Soon!</h3>
              <p className="text-sm opacity-90">
                {feature === "live"
                  ? "Live match tracking is launching very soon. Stay tuned for real-time scores and updates!"
                  : "Fits and Match is coming soon. Get ready to explore the catalogue!"}
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="ml-2 shrink-0 text-white/70 hover:text-white transition-colors"
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
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container w-[95%] mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="rounded-lg  flex items-center justify-center text-primary-foreground">
              <Image
                src="/5Stars.png"
                alt="5Stars Logo"
                width={122}
                height={122}
              />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-10 px-4 text-sm font-medium hover:bg-primary/5 transition-all"
              onClick={() => showComingSoonToast("fixtures")}
            >
              <Zap className="w-4 h-4 mr-2" />
              Browse Fits and Match
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-10 px-4 text-sm font-medium hover:bg-primary/5 transition-all"
              onClick={() => showComingSoonToast("live")}
            >
              <Clock className="w-4 h-4 mr-2" />
              View Live Matches
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-10 px-4 text-sm font-medium hover:bg-primary/5 transition-all"
              onClick={() => router.push("/csl")}
            >
              <Star className="w-4 h-4 mr-2" /> CSL
            </Button>
          </div>
          <div className="hidden md:flex gap-4 items-center">
            <Link
              href="https://team.5Starsteams.com"
              target="_blank"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Visit Dashboard
            </Link>
            <Button
              className="rounded-full"
              onClick={() => setIsModalOpen(true)}
            >
              Become a Coach
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
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
            className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container w-[95%] mx-auto py-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2 border-b border-border/20 pb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start h-12 px-4 text-left"
                  onClick={() => showComingSoonToast("fixtures")}
                >
                  <Zap className="w-5 h-5 mr-3 shrink-0" />
                  Browse Fits and Match
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start h-12 px-4 text-left"
                  onClick={() => showComingSoonToast("live")}
                >
                  <Clock className="w-5 h-5 mr-3 shrink-0" />
                  View Live Matches
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start h-12 px-4 text-left"
                  onClick={() => router.push("/csl")}
                >
                  <Star className="w-5 h-5 mr-3 shrink-0" /> CSL
                </Button>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link
                  href="https://team.5Starsteams.com"
                  target="_blank"
                  className="py-2 text-sm font-medium"
                >
                  Visit Team Dashboard
                </Link>
                <Button
                  className="rounded-full"
                  onClick={() => setIsModalOpen(true)}
                >
                  Become a Coach
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>
      <main className="flex-1">
        {/* Hero Section - Adapted for 5Stars */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Launching Now
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                Join the 5Stars Football Leagues
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                The ultimate platform for grassroots football in Nigeria.
                Register your team, manage players, track live scores, and
                compete in exciting tournaments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base"
                  onClick={() => setIsModalOpen(true)}
                >
                  Become a Coach
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base"
                >
                  Learn More
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Easy Registration</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Real-time Updates</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Community Support</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-linear-to-b from-background to-muted/20">
                <Image
                  src="/place.png"
                  width={1280}
                  height={720}
                  alt="5Stars Dashboard"
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-75 w-75 rounded-full bg-linear-to-br from-primary/30 to-secondary/30 blur-3xl opacity-70"></div>
              <div className="absolute -top-6 -left-6 -z-10 h-75 w-75 rounded-full bg-linear-to-br from-secondary/30 to-primary/30 blur-3xl opacity-70"></div>
            </motion.div>
          </div>
        </section>

        {/* Features Section - Adapted */}
        <section id="features" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Everything You Need for Your Team
              </h2>
              <p className="max-w-200 text-muted-foreground md:text-lg">
                {" "}
                Our platform provides tools to manage teams, track matches, and
                engage in the 5Stars football Consultancy
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-border/40 bg-linear-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section - Adapted */}
        <section className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Simple Process to Join the Leagues
              </h2>
              <p className="max-w-200 text-muted-foreground md:text-lg">
                Get your team registered and start competing in minutes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Register as Coach",
                  description:
                    "Sign up as a head coach or team manager with your details.",
                },
                {
                  step: "02",
                  title: "Build Your Team",
                  description:
                    "Add players, customize your roster, and prepare for matches.",
                },
                {
                  step: "03",
                  title: "Compete & Track",
                  description:
                    "Participate in tournaments and monitor live scores and standings.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary/70 text-primary-foreground text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Adapted */}
        <section id="faq" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="max-w-200 text-muted-foreground md:text-lg">
                Find answers to common questions about the 5Stars platform.
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How do I register my team?",
                    answer:
                      "Click 'Become a Coach' to open the registration modal and sign up as a coach or manager.",
                  },
                  {
                    question: "Is there a fee to join?",
                    answer:
                      "No, registration is free. Participate in various leagues comes at a cost though.",
                  },
                  {
                    question: "How can I track live matches?",
                    answer:
                      "Once registered, access the dashboard for real-time scores and updates.",
                  },
                  {
                    question:
                      "What regions are eligible for the 5stars football Consultancy leagues?",
                    answer:
                      "Currently focused on Nigeria, with teams from Abuja, Lagos, and more.",
                  },
                  {
                    question: "How secure is my account?",
                    answer:
                      "We use secure authentication and encryption to protect your data.",
                  },
                  {
                    question: "What kind of support do you offer?",
                    answer:
                      "Email support and community forums are available for all users.",
                  },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-border/40 py-2"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section - Updated with toast handler */}
        <section className="w-full py-20 md:py-32 bg-linear-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size[4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Ready to Join 5Stars?
              </h2>
              <p className="mx-auto max-w-175 text-primary-foreground/80 md:text-xl">
                Register your team today and compete in Nigeria's top grassroots
                football league.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base"
                  onClick={() => setIsModalOpen(true)}
                >
                  Become a Coach
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                  onClick={handleViewLiveMatches}
                >
                  View Live Matches
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/80 mt-4">
                Free registration. Real-time updates. Join now.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="size-8 rounded-lg bg-linear-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                  5S
                </div>
                <span>5Stars</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The premier grassroots football league in Nigeria. Manage teams,
                track scores, and compete.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://x.com/5stars_football?lang=en"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://www.instagram.com/5stars_premierleague?igsh=aWxsMmhraG9pbDNw"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 102 102"
                    id="instagram"
                  >
                    <defs>
                      <radialGradient
                        id="a"
                        cx="6.601"
                        cy="99.766"
                        r="129.502"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".09" stop-color="#fa8f21"></stop>
                        <stop offset=".78" stop-color="#d82d7e"></stop>
                      </radialGradient>
                      <radialGradient
                        id="b"
                        cx="70.652"
                        cy="96.49"
                        r="113.963"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          offset=".64"
                          stop-color="#8c3aaa"
                          stop-opacity="0"
                        ></stop>
                        <stop offset="1" stop-color="#8c3aaa"></stop>
                      </radialGradient>
                    </defs>
                    <path
                      fill="url(#a)"
                      d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                    ></path>
                    <path
                      fill="url(#b)"
                      d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                    ></path>
                    <path
                      fill="#fff"
                      d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229"
                      transform="translate(-422.637 -426.196)"
                    ></path>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4"></div>
            <div className="space-y-4"></div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://team.5Starsteams.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Visit Team Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsModalOpen(true)}
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Become a Coach
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={handleViewLiveMatches}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    View Live Matches
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} 5Stars. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

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
}
