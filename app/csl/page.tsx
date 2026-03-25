"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ChevronRight, Menu, X, Clock, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

// ──────────────────────────────────────────────────────────────
// FULLY HARDCODED DATA — NO API CALLS ANYMORE
// ──────────────────────────────────────────────────────────────

const GROUPS = {
  capital: ["Beer Barn", "MTN", "Norrenberger", "NPF Pensions"],
  federal: ["PenCom", "Jaiz Bank", "Three M Plus", "48 Property"],
};

const HARDCODED_MATCHES = [
  {
    round: 1,
    homeTeam: { name: "PenCom" },
    awayTeam: { name: "Jaiz Bank" },
    homeScore: 1,
    awayScore: 1,
    date: "2025-11-15",
    time: "15:30",
    venue: "Monoliza Field, Central Area, Abuja",
    status: "completed",
  },
  {
    round: 1,
    homeTeam: { name: "MTN" },
    awayTeam: { name: "NPF Pensions" },
    homeScore: 0,
    awayScore: 0,
    date: "2025-11-15",
    time: "16:30",
    venue: "Monoliza Field, Central Area, Abuja",
    status: "completed",
  },
  {
    round: 1,
    homeTeam: { name: "Beer Barn" },
    awayTeam: { name: "Norrenberger" },
    homeScore: 0,
    awayScore: 0,
    date: "2025-11-15",
    time: "17:30",
    venue: "Monoliza Field, Central Area, Abuja",
    status: "completed",
  },
  {
    round: 1,
    homeTeam: { name: "Three M Plus" },
    awayTeam: { name: "48 Property" },
    homeScore: 0,
    awayScore: 1,
    date: "2025-11-15",
    time: "18:30",
    venue: "Monoliza Field, Central Area, Abuja",
    status: "completed",
  },
];

// All teams list (used for standings)
const ALL_TEAMS = [
  "PenCom",
  "Jaiz Bank",
  "MTN",
  "NPF Pensions",
  "Beer Barn",
  "Norrenberger",
  "Three M Plus",
  "48 Property",
].map((name) => ({ name, _id: name.toLowerCase().replace(/\s+/g, "-") }));

export default function CSLPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Hardcoded standings calculation
  const calculateStandings = (teamNames: string[]) => {
    const map = teamNames.reduce((acc, name) => {
      const team = ALL_TEAMS.find((t) => t.name === name)!;
      acc[team._id] = {
        team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0,
      };
      return acc;
    }, {} as any);

    HARDCODED_MATCHES.forEach((m) => {
      const homeInGroup = teamNames.includes(m.homeTeam.name);
      const awayInGroup = teamNames.includes(m.awayTeam.name);
      if (!homeInGroup || !awayInGroup) return;

      const home = map[ALL_TEAMS.find((t) => t.name === m.homeTeam.name)!._id];
      const away = map[ALL_TEAMS.find((t) => t.name === m.awayTeam.name)!._id];

      home.played++;
      away.played++;
      home.gf += m.homeScore;
      home.ga += m.awayScore;
      away.gf += m.awayScore;
      away.ga += m.homeScore;

      if (m.homeScore > m.awayScore) {
        home.won++;
        home.pts += 3;
        away.lost++;
      } else if (m.homeScore < m.awayScore) {
        away.won++;
        away.pts += 3;
        home.lost++;
      } else {
        home.drawn++;
        away.drawn++;
        home.pts += 1;
        away.pts += 1;
      }

      home.gd = home.gf - home.ga;
      away.gd = away.gf - away.ga;
    });

    return Object.values(map).sort(
      (a: any, b: any) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf
    );
  };

  const capitalStandings = calculateStandings(GROUPS.capital);
  const federalStandings = calculateStandings(GROUPS.federal);

  const showComingSoonToast = (feature: string) => {
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm mx-auto"
        >
          <div className="flex items-start gap-4">
            <Clock className="w-8 h-8" />
            <div>
              <h3 className="font-bold">Coming Soon!</h3>
              <p className="text-sm opacity-90">
                {feature} is coming soon. Stay tuned!
              </p>
            </div>
            <button onClick={() => toast.dismiss(t)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ),
      { duration: 5000 }
    );
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // For MatchdaysTab (only 1 matchday now)
  const visibleMatchdays = 1;
  const totalMatchdays = 1;

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* ───── HEADER (100% same as before) ───── */}
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Image
              src="/5Stars.png"
              alt="5Stars Logo"
              width={122}
              height={122}
            />
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => showComingSoonToast("fixtures")}
            >
              <Zap className="w-4 h-4 mr-2" /> Browse Fits and Match
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => showComingSoonToast("live")}
            >
              <Clock className="w-4 h-4 mr-2" /> View Live Matches
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => router.push("/csl")}
            >
              <Star className="w-4 h-4 mr-2" /> CSL
            </Button>
          </div>
          <div className="hidden md:flex gap-4 items-center">
            <a
              href="https://team.5Starsteams.com"
              target="_blank"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Visit Dashboard
            </a>
            <Button
              className="rounded-full"
              onClick={() => showComingSoonToast("coach")}
            >
              Become a Coach <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu - exactly same as before */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container py-4 flex flex-col gap-4">
              {/* same buttons as desktop */}
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => showComingSoonToast("fixtures")}
              >
                <Zap className="w-5 h-5 mr-3" /> Browse Fits and Match
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => showComingSoonToast("live")}
              >
                <Clock className="w-5 h-5 mr-3" /> View Live Matches
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => router.push("/csl")}
              >
                <Star className="w-5 h-5 mr-3" /> CSL
              </Button>
              <a
                href="https://team.5Starsteams.com"
                target="_blank"
                className="py-2 text-sm font-medium"
              >
                Visit Team Dashboard
              </a>
              <Button
                className="rounded-full"
                onClick={() => showComingSoonToast("coach")}
              >
                Become a Coach <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      {/* ───── HERO SECTION (exact same) ───── */}
      <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge
              className="mb-4 rounded-full px-4 py-1.5"
              variant="secondary"
            >
              Corporate Stars League
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Corporate Stars League
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The premier corporate football league in Nigeria. Track fixtures,
              standings, and match results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───── TABS SECTION (exact same layout) ───── */}
      <section className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="fixtures" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-20 md:mb-0 bg-muted rounded-lg w-full max-w-4xl mx-auto">
              <TabsTrigger
                value="fixtures"
                className="flex-1 min-w-[100px] max-w-[150px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md h-10 text-sm font-medium"
              >
                Fixtures
              </TabsTrigger>
              <TabsTrigger
                value="standings"
                className="flex-1 min-w-[100px] max-w-[150px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md h-10 text-sm font-medium"
              >
                Standings
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="flex-1 min-w-[100px] max-w-[150px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md h-10 text-sm font-medium"
              >
                Past Matches
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="flex-1 min-w-[100px] max-w-[150px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md h-10 text-sm font-medium"
              >
                Upcoming Matches
              </TabsTrigger>
            </TabsList>

            {/* FIXTURES & RESULTS (same MatchdaysTab) */}
            <TabsContent value="fixtures">
              <MatchdaysTab
                matches={HARDCODED_MATCHES}
                visibleMatchdays={visibleMatchdays}
                totalMatchdays={totalMatchdays}
              />
            </TabsContent>

            <TabsContent value="past">
              <MatchdaysTab
                matches={HARDCODED_MATCHES}
                visibleMatchdays={visibleMatchdays}
                totalMatchdays={totalMatchdays}
                isPast
              />
            </TabsContent>

            <TabsContent value="upcoming">
              <MatchdaysTab
                matches={[]}
                visibleMatchdays={visibleMatchdays}
                totalMatchdays={totalMatchdays}
              />
            </TabsContent>

            {/* STANDINGS */}
            <TabsContent value="standings">
              <div className="space-y-12 max-w-5xl mx-auto">
                {/* Group 1 - Capital Territory */}
                <div>
                  <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Group 1 • Capital Territory
                  </h2>

                  {/* THIS IS THE KEY FIX → horizontal scroll on small screens */}
                  <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="min-w-[600px] md:min-w-0">
                      <Card className="border-border/40 shadow-lg">
                        <CardContent className="p-4 md:p-8">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-8">POS</TableHead>
                                <TableHead>Team</TableHead>
                                <TableHead className="text-center">P</TableHead>
                                <TableHead className="text-center">W</TableHead>
                                <TableHead className="text-center">D</TableHead>
                                <TableHead className="text-center">L</TableHead>
                                <TableHead className="text-center">
                                  GF
                                </TableHead>
                                <TableHead className="text-center">
                                  GA
                                </TableHead>
                                <TableHead className="text-center">
                                  GD
                                </TableHead>
                                <TableHead className="text-center w-16">
                                  PTS
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {capitalStandings.map((s: any, i) => (
                                <TableRow key={s.team._id}>
                                  <TableCell className="font-bold text-lg">
                                    {i + 1}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {s.team.name}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.played}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.won}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.drawn}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.lost}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.gf}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.ga}
                                  </TableCell>
                                  <TableCell
                                    className={`text-center font-medium ${
                                      s.gd >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {s.gd >= 0 ? `+${s.gd}` : s.gd}
                                  </TableCell>
                                  <TableCell className="text-center font-bold text-xl">
                                    {s.pts}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Group 2 - Federal Territory */}
                <div>
                  <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Group 2 • Federal Territory
                  </h2>

                  <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="min-w-[600px] md:min-w-0">
                      <Card className="border-border/40 shadow-lg">
                        <CardContent className="p-4 md:p-8">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-8">POS</TableHead>
                                <TableHead>Team</TableHead>
                                <TableHead className="text-center">P</TableHead>
                                <TableHead className="text-center">W</TableHead>
                                <TableHead className="text-center">D</TableHead>
                                <TableHead className="text-center">L</TableHead>
                                <TableHead className="text-center">
                                  GF
                                </TableHead>
                                <TableHead className="text-center">
                                  GA
                                </TableHead>
                                <TableHead className="text-center">
                                  GD
                                </TableHead>
                                <TableHead className="text-center w-16">
                                  PTS
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {federalStandings.map((s: any, i) => (
                                <TableRow key={s.team._id}>
                                  <TableCell className="font-bold text-lg">
                                    {i + 1}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {s.team.name}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.played}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.won}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.drawn}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.lost}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.gf}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {s.ga}
                                  </TableCell>
                                  <TableCell
                                    className={`text-center font-medium ${
                                      s.gd >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {s.gd >= 0 ? `+${s.gd}` : s.gd}
                                  </TableCell>
                                  <TableCell className="text-center font-bold text-xl">
                                    {s.pts}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer & Toaster - unchanged */}
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 5Stars. All rights reserved.
        </div>
      </footer>

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

// ───── REUSABLE COMPONENTS ─────
function MatchdaysTab({
  matches,
  visibleMatchdays,
  totalMatchdays,
  isPast = false,
}: any) {
  if (matches.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No matches to display yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/40 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Matchday 1 • Completed
            </span>
            <Badge variant="secondary">{matches.length} Matches</Badge>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    MD1
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Matchday 1</h3>
                  <p className="text-sm text-muted-foreground">
                    15 November 2025 • Completed
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {matches.map((match: any, i: number) => (
                <MatchCard key={i} match={match} isPast={isPast} />
              ))}
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

function MatchCard({ match, isPast }: { match: any; isPast: boolean }) {
  const score = `${match.homeScore}-${match.awayScore}`;

  const formattedDate = new Date(match.date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = match.time
    ? new Date(`1970-01-01T${match.time}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div className="rounded-xl border border-border/20 bg-card hover:border-primary/40 hover:bg-muted/10 transition-all backdrop-blur-sm overflow-hidden">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 p-1">
              <div className="w-full h-full rounded bg-white flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold">
                  {match.homeTeam.name[0]}
                </span>
              </div>
            </div>
            <div>
              <p className="font-semibold group-hover:text-primary">
                {match.homeTeam.name}
              </p>
              <p className="text-xs text-muted-foreground">HOME</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 px-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 flex items-center justify-center border-2 border-border/30 group-hover:border-primary/50">
              <span className="text-lg font-bold">{score}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="text-right">
              <p className="font-semibold group-hover:text-primary">
                {match.awayTeam.name}
              </p>
              <p className="text-xs text-muted-foreground">AWAY</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/10 p-1">
              <div className="w-full h-full rounded bg-white flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold">
                  {match.awayTeam.name[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary/10 p-0.5">
              <div className="w-full h-full rounded bg-white flex items-center justify-center">
                <span className="text-xs font-bold">
                  {match.homeTeam.name[0]}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold">{match.homeTeam.name}</p>
              <p className="text-xs text-muted-foreground">HOME</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="px-4 py-2 rounded-full bg-muted text-lg font-bold border">
              {score}
            </div>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <div className="flex-1 text-right">
              <p className="font-semibold">{match.awayTeam.name}</p>
              <p className="text-xs text-muted-foreground">AWAY</p>
            </div>
            <div className="w-8 h-8 rounded bg-gradient-to-br from-secondary/10 p-0.5">
              <div className="w-full h-full rounded bg-white flex items-center justify-center">
                <span className="text-xs font-bold">
                  {match.awayTeam.name[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border/20 text-center text-xs text-muted-foreground">
            {formattedDate} • {formattedTime} • {match.venue}
          </div>
        </div>

        {/* Date/Time/Venue - Desktop */}
        <div className="hidden md:block px-6 pb-3 text-xs text-muted-foreground">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {formattedDate} • {formattedTime}
              </span>
            </div>
            <div className="text-right">
              <span className="font-medium">Venue:</span> {match.venue}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
