// lib/csl-data.ts
export const GROUPS = {
  capital: ["Beer Barn", "MTN", "Norrenberger", "NPF Pensions"],
  federal: ["PenCom", "Jaiz Bank", "Three M Plus", "48 Property"],
};

export type Match = {
  id: string;
  round: number | "semi" | "third" | "final"; // 1, 2, 3, "semi", "final"
  name: string; // "Gameweek 1", "Semi-Finals", etc.
  date: string; // "2025-11-22"
  status: "completed" | "upcoming";
  matches: {
    id: string;
    homeTeam: { name: string };
    awayTeam: { name: string };
    homeScore?: number;
    awayScore?: number;
    penalties?: {
      // Added for knockout matches that go to pens
      home: number;
      away: number;
      winner: "home" | "away";
    };
    time: string;
    venue: string;
  }[];
};

export const ALL_MATCHES: Match[] = [
  // ── GAMEWEEK 1 (already exists) ──
  {
    id: "gw1",
    round: 1,
    name: "Gameweek 1",
    date: "2025-11-15",
    status: "completed",
    matches: [
      {
        id: "m1",
        homeTeam: { name: "PenCom" },
        awayTeam: { name: "Jaiz Bank" },
        homeScore: 1,
        awayScore: 1,
        time: "15:30",
        venue: "Monoliza Field, Central Area, Abuja",
      },
      {
        id: "m2",
        homeTeam: { name: "MTN" },
        awayTeam: { name: "NPF Pensions" },
        homeScore: 0,
        awayScore: 0,
        time: "16:30",
        venue: "Monoliza Field, Central Area, Abuja",
      },
      {
        id: "m3",
        homeTeam: { name: "Beer Barn" },
        awayTeam: { name: "Norrenberger" },
        homeScore: 0,
        awayScore: 0,
        time: "17:30",
        venue: "Monoliza Field, Central Area, Abuja",
      },
      {
        id: "m4",
        homeTeam: { name: "Three M Plus" },
        awayTeam: { name: "48 Property" },
        homeScore: 0,
        awayScore: 1,
        time: "18:30",
        venue: "Monoliza Field, Central Area, Abuja",
      },
    ],
  },

  // ── GAMEWEEK 2 (add your real fixtures here) ──
  {
    id: "gw2",
    round: 2,
    name: "Gameweek 2",
    date: "2025-11-22",
    status: "completed",
    matches: [
      {
        id: "m5",
        homeTeam: { name: "PenCom" },
        awayTeam: { name: "48 Property" },
        homeScore: 0,
        awayScore: 0,
        time: "16:00",
        venue: "Monoliza Field, Central Area, Abuja",
      },
      {
        id: "m6",
        homeTeam: { name: "MTN" },
        awayTeam: { name: "Beer Barn" },
        homeScore: 0,
        awayScore: 2,
        time: "17:00",
        venue: "Monoliza Field, Central Area, Abuja",
      },
      {
        id: "m7",
        homeTeam: { name: "Three M Plus" },
        awayTeam: { name: "Jaiz Bank" },
        homeScore: 1,
        awayScore: 2,
        time: "16:00",
        venue: "Monoliza Field, Central Area, Abuja",
      },
      {
        id: "m8",
        homeTeam: { name: "NPF Pensions" },
        awayTeam: { name: "Norrenberger" },
        homeScore: 0,
        awayScore: 1,
        time: "17:00",
        venue: "Monoliza Field, Central Area, Abuja",
      },
    ],
  },

  // ── GAMEWEEK 3 ──
  {
    id: "gw3",
    round: 3,
    name: "Gameweek 3",
    date: "2025-11-29",
    status: "completed",
    matches: [
      {
        id: "m9",
        homeTeam: { name: "Norrenberger" },
        awayTeam: { name: "MTN" },
        homeScore: 4,
        awayScore: 1,
        time: "17:00",
        venue: "Monoliza Field, Central Area, Abuja",
      },
      {
        id: "m10",
        homeTeam: { name: "48 Property" },
        awayTeam: { name: "Jaiz Bank" },
        homeScore: 1,
        awayScore: 0,
        time: "17:00",
        venue: "Monoliza Field, Central Area, Abuja",
      },
      {
        id: "m11",
        homeTeam: { name: "Beer Barn" },
        awayTeam: { name: "NPF Pensions" },
        homeScore: 1,
        awayScore: 1,
        time: "17:00",
        venue: "Monoliza Field, Central Area, Abuja",
      },
      {
        id: "m12",
        homeTeam: { name: "Three M Plus" },
        awayTeam: { name: "PenCom" },
        homeScore: 0,
        awayScore: 2,
        time: "17:00",
        venue: "Monoliza Field, Central Area, Abuja",
      },
    ],
  },

  // ── SEMI-FINALS ──
  {
    id: "semi",
    round: "semi",
    name: "Semi-Finals",
    date: "2025-12-07",
    status: "completed",
    matches: [
      {
        id: "s1",
        homeTeam: { name: "Norrenberger" },
        awayTeam: { name: "48 Property" },
        homeScore: 1,
        awayScore: 1,
        penalties: { home: 2, away: 1, winner: "home" }, // Norrenberger wins 2-1 on pens
        time: "16:00",
        venue: "Monoliza Field, Central Area, Abuja",
      },
      {
        id: "s2",
        homeTeam: { name: "PenCom" },
        awayTeam: { name: "Beer Barn" },
        homeScore: 1,
        awayScore: 1,
        penalties: { home: 2, away: 3, winner: "away" }, // Beer Barn wins 3-2 on pens
        time: "17:00",
        venue: "Monoliza Field, Central Area, Abuja",
      },
    ],
  },

  // ── THIRD PLACE PLAYOFF (New!) ──
  {
    id: "third",
    round: "third",
    name: "Third Place Playoff",
    date: "2025-12-13",
    status: "completed",
    matches: [
      {
        id: "t1",
        homeTeam: { name: "48 Property" },
        awayTeam: { name: "PenCom" },
        homeScore: 2,
        awayScore: 0,
        time: "16:15",
        venue: "Monoliza Field, Central Area, Abuja",
      },
    ],
  },

  // ── FINAL ──
  {
    id: "final",
    round: "final",
    name: "Final",
    date: "2025-12-13",
    status: "completed",
    matches: [
      {
        id: "f1",
        homeTeam: { name: "Norrenberger" },
        awayTeam: { name: "Beer Barn" },
        homeScore: 1,
        awayScore: 0,
        time: "17:15",
        venue: "Monoliza Field, Central Area, Abuja",
      },
    ],
  },
];
