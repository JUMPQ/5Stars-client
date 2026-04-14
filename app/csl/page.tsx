"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Zap, Star, ChevronRight, Menu, X } from "lucide-react";
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
import Header from "@/components/layout/header";
// Import the new structured data
import { ALL_MATCHES, GROUPS, type Match } from "@/lib/csl-data";

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
].map((name) => ({
  name,
  _id: name.toLowerCase().replace(/\s+/g, "-"),
}));

export default function CSLPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Hardcoded standings calculation (kept as-is, only uses group stage matches)
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

    // Only count group stage matches (round 1,2,3)
    const groupMatches = ALL_MATCHES.filter((m) => typeof m.round === "number");

    groupMatches.forEach((round) => {
      round.matches.forEach((m: any) => {
        const homeInGroup = teamNames.includes(m.homeTeam.name);
        const awayInGroup = teamNames.includes(m.awayTeam.name);
        if (!homeInGroup || !awayInGroup) return;

        const home =
          map[ALL_TEAMS.find((t) => t.name === m.homeTeam.name)!._id];
        const away =
          map[ALL_TEAMS.find((t) => t.name === m.awayTeam.name)!._id];

        home.played++;
        away.played++;
        home.gf += m.homeScore ?? 0;
        home.ga += m.awayScore ?? 0;
        away.gf += m.awayScore ?? 0;
        away.ga += m.homeScore ?? 0;

        if (m.homeScore! > m.awayScore!) {
          home.won++;
          home.pts += 3;
          away.lost++;
        } else if (m.homeScore! < m.awayScore!) {
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
    });

    return Object.values(map).sort(
      (a: any, b: any) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf,
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
          className="max-w-sm p-6 mx-auto text-white shadow-2xl bg-linear-to-r from-yellow-500 to-orange-500 rounded-2xl"
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
      { duration: 5000 },
    );
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      {/* HEADER - unchanged */}
      <Header />

      {/* HERO SECTION - unchanged */}
      <section className="w-full py-20 overflow-hidden md:py-32 lg:py-40">
        <div className=" container w-[95%] mx-auto relative px-4 md:px-6">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size[:4rem_4rem]  mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-12 text-center"
          >
            <Badge
              className="mb-4 rounded-full px-4 py-1.5"
              variant="secondary"
            >
              Corporate Stars League
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl bg-clip-text bg-linear-to-r from-foreground to-foreground/70">
              Corporate Stars League
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-muted-foreground">
              The premier corporate football league in Nigeria. Track fixtures,
              standings, and match results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TABS SECTION - UPDATED */}
      <section className="w-full py-20 md:py-32">
        <div className="container w-[95%] mx-auto px-4 md:px-6">
          <Tabs defaultValue="fixtures" className="w-full">
            <TabsList className="flex flex-wrap justify-center w-full max-w-lg gap-2 mx-auto mb-20 rounded-lg md:mb-0">
              <TabsTrigger
                value="fixtures"
                className="flex-1  w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md h-10 text-sm font-medium"
              >
                Fixtures
              </TabsTrigger>
              <TabsTrigger
                value="standings"
                className="flex-1 w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md h-10 text-sm font-medium"
              >
                Standings
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="flex-1 w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md h-10 text-sm font-medium"
              >
                Results
              </TabsTrigger>
            </TabsList>

            {/* UPDATED FIXTURES TAB - Shows ALL rounds */}
            <TabsContent value="fixtures" className="space-y-12">
              {ALL_MATCHES.map((round) => (
                <MatchdaySection
                  key={round.id}
                  round={round}
                  showScores={false}
                />
              ))}
            </TabsContent>

            {/* PAST MATCHES TAB - Shows only completed matches */}
            <TabsContent value="past" className="space-y-12">
              {ALL_MATCHES.filter((r) => r.status === "completed").map(
                (round) => (
                  <MatchdaySection
                    key={round.id}
                    round={round}
                    showScores={true}
                  />
                ),
              )}
            </TabsContent>

            {/* STANDINGS - unchanged */}
            <TabsContent value="standings">
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="mt-3">
                  <h2 className="mb-6 text-2xl font-bold text-center text-transparent bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text">
                    Group 1 • Capital Territory
                  </h2>
                  <div className="px-4 -mx-4 overflow-x-auto md:mx-0 md:px-0">
                    <div className="min-w-150 md:min-w-0">
                      <Card className="shadow-lg border-border/40">
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
                                <TableHead className="w-16 text-center">
                                  PTS
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {capitalStandings.map((s: any, i) => (
                                <TableRow key={s.team._id}>
                                  <TableCell className="text-lg font-bold">
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
                                    className={`text-center font-medium ${s.gd >= 0 ? "text-green-600" : "text-red-600"}`}
                                  >
                                    {s.gd >= 0 ? `+${s.gd}` : s.gd}
                                  </TableCell>
                                  <TableCell className="text-xl font-bold text-center">
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

                <div>
                  <h2 className="mb-6 text-2xl font-bold text-center text-transparent bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text">
                    Group 2 • Federal Territory
                  </h2>
                  <div className="px-4 -mx-4 overflow-x-auto md:mx-0 md:px-0">
                    <div className="min-w-150 md:min-w-0">
                      <Card className="shadow-lg border-border/40">
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
                                <TableHead className="w-16 text-center">
                                  PTS
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {federalStandings.map((s: any, i) => (
                                <TableRow key={s.team._id}>
                                  <TableCell className="text-lg font-bold">
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
                                    className={`text-center font-medium ${s.gd >= 0 ? "text-green-600" : "text-red-600"}`}
                                  >
                                    {s.gd >= 0 ? `+${s.gd}` : s.gd}
                                  </TableCell>
                                  <TableCell className="text-xl font-bold text-center">
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

      {/* Footer & Toaster */}
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 text-sm text-center md:px-6 lg:py-16 text-muted-foreground">
          © {new Date().getFullYear()} 5Stars. All rights reserved.
        </div>
      </footer>

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

// ───── NEW REUSABLE COMPONENTS ─────
// ───── UPDATED MatchdaySection ─────
function MatchdaySection({
  round,
  showScores = false,
}: {
  round: Match;
  showScores?: boolean; // New prop: true = show scores (Past tab), false = show VS (Fixtures tab)
}) {
  const isCompleted = round.status === "completed";
  // Calculate date range for the header
  const dates = round.matches
    .map((m) => m.date || round.date) // Use per-match date if available
    .filter(Boolean);

  const uniqueDates = [...new Set(dates)].sort();

  let headerDate = "";
  if (uniqueDates.length === 1) {
    // All matches on same date
    headerDate = new Date(uniqueDates[0]).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } else if (uniqueDates.length > 1) {
    // Multiple dates → show range (e.g. 22 - 23 November 2025)
    const first = new Date(uniqueDates[0]);
    const last = new Date(uniqueDates[uniqueDates.length - 1]);

    headerDate = `${first.getDate()} - ${last.getDate()} ${first.toLocaleString("en-GB", { month: "long" })} ${first.getFullYear()}`;
  }
  return (
    <Card className="shadow-sm border-border/40 mt-6">
      <CardContent className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              {round.name} • {isCompleted ? "Completed" : "Upcoming"}
            </span>
            <Badge variant="secondary">{round.matches.length} Matches</Badge>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-primary to-primary/70">
                  <span className="text-sm font-bold text-primary-foreground">
                    {round.round === "semi"
                      ? "SF"
                      : round.round === "third"
                        ? "3rd"
                        : round.round === "final"
                          ? "F"
                          : `GW${round.round}`}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{round.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {headerDate}• {isCompleted ? "Completed" : "Upcoming"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {round.matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  roundType={round.round}
                  roundDate={round.date}
                  matchDate={match.date}
                  showScores={showScores} // ← Pass the flag
                />
              ))}
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
function MatchCard({
  match,
  roundType,
  roundDate,
  matchDate,
  showScores = false,
}: {
  match: any;
  roundType: Match["round"];
  roundDate: string;
  matchDate?: string;
  showScores?: boolean;
}) {
  const hasPenalties = match.penalties;

  // Decide what to show
  let scoreContent: React.ReactNode;

  if (
    showScores &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined
  ) {
    // Past Matches → Show score + penalties below
    scoreContent = (
      <>
        {/* Regular time score - stays inside the circle */}
        <div className="flex items-center justify-center w-14 h-14 border-2 rounded-full bg-linear-to-r from-primary/5 to-secondary/5 border-border/30 group-hover:border-primary/50">
          <span className="text-xl font-bold tracking-tight">
            {match.homeScore} - {match.awayScore}
          </span>
        </div>

        {/* Penalty info - directly under the circle, outside the border */}
        {hasPenalties && (
          <div className="mt-3 text-center">
            <div className="text-xs font-medium text-amber-600">
              ({match.penalties.home} - {match.penalties.away} pens)
            </div>
            <div className="text-[10px] text-amber-600/80 font-medium">
              {match.penalties.winner === "home"
                ? match.homeTeam.name
                : match.awayTeam.name}{" "}
              wins
            </div>
          </div>
        )}
      </>
    );
  } else {
    // Fixtures tab → Show "VS" inside the circle
    scoreContent = (
      <div className="flex items-center justify-center w-14 h-14 border-2 rounded-full bg-linear-to-r from-primary/5 to-secondary/5 border-border/30 group-hover:border-primary/50">
        <span className="text-xl font-bold tracking-tight text-muted-foreground">
          VS
        </span>
      </div>
    );
  }

  // Date formatting
  const finalDate =
    matchDate || roundDate || new Date().toISOString().split("T")[0]; // Fallback to current date if both are missing
  const formattedDate = new Date(finalDate).toLocaleDateString("en-GB", {
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
      className="cursor-pointer group"
    >
      <div className="overflow-hidden transition-all border rounded-xl border-border/20 bg-card hover:border-primary/40 hover:bg-muted/10 backdrop-blur-sm">
        {/* Desktop View */}
        <div className="items-center justify-between hidden px-6 py-6 md:flex">
          <div className="flex items-center flex-1 gap-3">
            <div className="w-10 h-10 p-1 rounded-lg bg-linear-to-br from-primary/10">
              <div className="flex items-center justify-center w-full h-full bg-white rounded shadow-sm">
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

          <div className="flex flex-col items-center px-6">{scoreContent}</div>

          <div className="flex items-center justify-end flex-1 gap-3">
            <div className="text-right">
              <p className="font-semibold group-hover:text-primary">
                {match.awayTeam.name}
              </p>
              <p className="text-xs text-muted-foreground">AWAY</p>
            </div>
            <div className="w-10 h-10 p-1 rounded-lg bg-linear-to-br from-secondary/10">
              <div className="flex items-center justify-center w-full h-full bg-white rounded shadow-sm">
                <span className="text-xs font-bold">
                  {match.awayTeam.name[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="p-4 space-y-3 md:hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-linear-to-br from-primary/10 p-0.5">
              <div className="flex items-center justify-center w-full h-full bg-white rounded">
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

          <div className="flex flex-col items-center">{scoreContent}</div>

          <div className="flex items-center justify-end gap-3">
            <div className="flex-1 text-right">
              <p className="font-semibold">{match.awayTeam.name}</p>
              <p className="text-xs text-muted-foreground">AWAY</p>
            </div>
            <div className="w-8 h-8 rounded bg-linear-to-br from-secondary/10 p-0.5">
              <div className="flex items-center justify-center w-full h-full bg-white rounded">
                <span className="text-xs font-bold">
                  {match.awayTeam.name[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-center border-t border-border/20 text-muted-foreground">
            {formattedDate} • {formattedTime} • {match.venue}
          </div>
        </div>

        {/* Desktop Date/Venue */}
        <div className="hidden px-6 pb-3 text-xs md:block text-muted-foreground">
          <div className="flex items-center justify-between">
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
