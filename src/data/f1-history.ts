// ─── Historical F1 Data ──────────────────────────────────────────
// Comprehensive archive: Champions, career stats, circuit records

export interface WDCRecord {
  year: number;
  driver: string;
  team: string;
  teamColor: string;
  points: number;
  wins: number;
  era: "ferrari-dominance" | "red-bull-rise" | "hybrid-mercedes" | "max-era" | "new-era";
}

export interface DriverCareerStats {
  slug: string;
  championships: number;
  entries: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  firstEntry: number; // year
  nationality: string;
  careerHighlight: string;
}

export interface CircuitHistoricalWinner {
  year: number;
  driver: string;
  team: string;
  teamColor: string;
  lapRecord?: string;
}

export interface CircuitHistory {
  circuitSlug: string;
  mostWins: { driver: string; wins: number };
  winners: CircuitHistoricalWinner[];
}

// ─── World Drivers' Champions 2000–2025 ─────────────────────────
export const PAST_CHAMPIONS: WDCRecord[] = [
  { year: 2025, driver: "Lando Norris",       team: "McLaren",   teamColor: "#FF8700", points: 429, wins: 14, era: "new-era" },
  { year: 2024, driver: "Max Verstappen",      team: "Red Bull",  teamColor: "#3671C6", points: 437, wins: 9,  era: "max-era" },
  { year: 2023, driver: "Max Verstappen",      team: "Red Bull",  teamColor: "#3671C6", points: 575, wins: 19, era: "max-era" },
  { year: 2022, driver: "Max Verstappen",      team: "Red Bull",  teamColor: "#3671C6", points: 454, wins: 15, era: "max-era" },
  { year: 2021, driver: "Max Verstappen",      team: "Red Bull",  teamColor: "#3671C6", points: 395, wins: 10, era: "max-era" },
  { year: 2020, driver: "Lewis Hamilton",      team: "Mercedes",  teamColor: "#27F4D2", points: 347, wins: 11, era: "hybrid-mercedes" },
  { year: 2019, driver: "Lewis Hamilton",      team: "Mercedes",  teamColor: "#27F4D2", points: 413, wins: 11, era: "hybrid-mercedes" },
  { year: 2018, driver: "Lewis Hamilton",      team: "Mercedes",  teamColor: "#27F4D2", points: 408, wins: 11, era: "hybrid-mercedes" },
  { year: 2017, driver: "Lewis Hamilton",      team: "Mercedes",  teamColor: "#27F4D2", points: 363, wins: 9,  era: "hybrid-mercedes" },
  { year: 2016, driver: "Nico Rosberg",        team: "Mercedes",  teamColor: "#27F4D2", points: 385, wins: 9,  era: "hybrid-mercedes" },
  { year: 2015, driver: "Lewis Hamilton",      team: "Mercedes",  teamColor: "#27F4D2", points: 381, wins: 10, era: "hybrid-mercedes" },
  { year: 2014, driver: "Lewis Hamilton",      team: "Mercedes",  teamColor: "#27F4D2", points: 384, wins: 11, era: "hybrid-mercedes" },
  { year: 2013, driver: "Sebastian Vettel",    team: "Red Bull",  teamColor: "#3671C6", points: 397, wins: 13, era: "red-bull-rise" },
  { year: 2012, driver: "Sebastian Vettel",    team: "Red Bull",  teamColor: "#3671C6", points: 281, wins: 5,  era: "red-bull-rise" },
  { year: 2011, driver: "Sebastian Vettel",    team: "Red Bull",  teamColor: "#3671C6", points: 392, wins: 11, era: "red-bull-rise" },
  { year: 2010, driver: "Sebastian Vettel",    team: "Red Bull",  teamColor: "#3671C6", points: 256, wins: 5,  era: "red-bull-rise" },
  { year: 2009, driver: "Jenson Button",       team: "Brawn GP",  teamColor: "#ffffff", points: 95,  wins: 6,  era: "red-bull-rise" },
  { year: 2008, driver: "Lewis Hamilton",      team: "McLaren",   teamColor: "#FF8700", points: 98,  wins: 5,  era: "red-bull-rise" },
  { year: 2007, driver: "Kimi Räikkönen",      team: "Ferrari",   teamColor: "#DC0000", points: 110, wins: 6,  era: "ferrari-dominance" },
  { year: 2006, driver: "Fernando Alonso",     team: "Renault",   teamColor: "#FFF500", points: 134, wins: 7,  era: "ferrari-dominance" },
  { year: 2005, driver: "Fernando Alonso",     team: "Renault",   teamColor: "#FFF500", points: 133, wins: 7,  era: "ferrari-dominance" },
  { year: 2004, driver: "Michael Schumacher",  team: "Ferrari",   teamColor: "#DC0000", points: 148, wins: 13, era: "ferrari-dominance" },
  { year: 2003, driver: "Michael Schumacher",  team: "Ferrari",   teamColor: "#DC0000", points: 93,  wins: 6,  era: "ferrari-dominance" },
  { year: 2002, driver: "Michael Schumacher",  team: "Ferrari",   teamColor: "#DC0000", points: 144, wins: 11, era: "ferrari-dominance" },
  { year: 2001, driver: "Michael Schumacher",  team: "Ferrari",   teamColor: "#DC0000", points: 123, wins: 9,  era: "ferrari-dominance" },
  { year: 2000, driver: "Michael Schumacher",  team: "Ferrari",   teamColor: "#DC0000", points: 108, wins: 9,  era: "ferrari-dominance" },
];

// ─── Driver Career Statistics ────────────────────────────────────
export const DRIVER_CAREER_STATS: Record<string, DriverCareerStats> = {
  "max-verstappen": {
    slug: "max-verstappen",
    championships: 4,
    entries: 207,
    wins: 62,
    podiums: 110,
    poles: 40,
    fastestLaps: 31,
    firstEntry: 2015,
    nationality: "Dutch",
    careerHighlight: "Youngest ever race winner (18y 228d) & 4× consecutive World Champion",
  },
  "lewis-hamilton": {
    slug: "lewis-hamilton",
    championships: 7,
    entries: 353,
    wins: 103,
    podiums: 197,
    poles: 104,
    fastestLaps: 67,
    firstEntry: 2007,
    nationality: "British",
    careerHighlight: "Joint-most World Championships (7) and all-time record holder for wins, poles & podiums",
  },
  "charles-leclerc": {
    slug: "charles-leclerc",
    championships: 0,
    entries: 142,
    wins: 8,
    podiums: 43,
    poles: 26,
    fastestLaps: 8,
    firstEntry: 2018,
    nationality: "Monégasque",
    careerHighlight: "Back-to-back poles at Spa & Monza in 2019 as a Ferrari sophomore",
  },
  "lando-norris": {
    slug: "lando-norris",
    championships: 1,
    entries: 137,
    wins: 20,
    podiums: 55,
    poles: 16,
    fastestLaps: 15,
    firstEntry: 2019,
    nationality: "British",
    careerHighlight: "2025 World Champion — youngest McLaren champion since Senna",
  },
  "george-russell": {
    slug: "george-russell",
    championships: 0,
    entries: 125,
    wins: 5,
    podiums: 23,
    poles: 6,
    fastestLaps: 9,
    firstEntry: 2019,
    nationality: "British",
    careerHighlight: "Qualified Williams on pole in Bahrain 2020 from the pitlane (sub for Hamilton)",
  },
  "oscar-piastri": {
    slug: "oscar-piastri",
    championships: 0,
    entries: 62,
    wins: 6,
    podiums: 22,
    poles: 4,
    fastestLaps: 7,
    firstEntry: 2023,
    nationality: "Australian",
    careerHighlight: "Second-fastest ever to reach 10 F1 podiums",
  },
};

// ─── Dominance Eras Summary ─────────────────────────────────────
export interface DominanceEra {
  id: string;
  label: string;
  period: string;
  team: string;
  teamColor: string;
  championships: number;
  description: string;
  icon: string;
}

export const DOMINANCE_ERAS: DominanceEra[] = [
  {
    id: "ferrari-dominance",
    label: "Scuderia's Golden Age",
    period: "2000 – 2004",
    team: "Ferrari",
    teamColor: "#DC0000",
    championships: 5,
    description: "Michael Schumacher and Ferrari were untouchable, rewriting the record books with five consecutive titles during the V10 era.",
    icon: "🔴",
  },
  {
    id: "red-bull-rise",
    label: "Vettel's Reign",
    period: "2010 – 2013",
    team: "Red Bull",
    teamColor: "#3671C6",
    championships: 4,
    description: "Adrian Newey's aerodynamic masterclasses and Sebastian Vettel's mechanical sympathy produced four back-to-back championships.",
    icon: "🐂",
  },
  {
    id: "hybrid-mercedes",
    label: "Silver Arrow Supremacy",
    period: "2014 – 2021",
    team: "Mercedes",
    teamColor: "#27F4D2",
    championships: 7,
    description: "A dominant eight-year run driven by a revolutionary hybrid power unit and the genius of Lewis Hamilton.",
    icon: "⭐",
  },
  {
    id: "max-era",
    label: "Max's Era",
    period: "2021 – 2024",
    team: "Red Bull",
    teamColor: "#3671C6",
    championships: 4,
    description: "Max Verstappen's ferocious speed and Red Bull's RB18/RB19 produced back-to-back dominant campaigns, including a record 19 wins in a single season.",
    icon: "⚡",
  },
  {
    id: "new-era",
    label: "The New Contenders",
    period: "2025 – Present",
    team: "McLaren",
    teamColor: "#FF8700",
    championships: 1,
    description: "A new technical era disperses performance across multiple teams. McLaren's Lando Norris broke Red Bull's four-season stranglehold with a thrilling 2025 title fight.",
    icon: "🔶",
  },
];

// ─── Circuit Historical Winners ──────────────────────────────────
export const CIRCUIT_HISTORY: Record<string, CircuitHistory> = {
  "monaco-gp": {
    circuitSlug: "monaco-gp",
    mostWins: { driver: "Ayrton Senna", wins: 6 },
    winners: [
      { year: 2025, driver: "Charles Leclerc", team: "Ferrari", teamColor: "#DC0000" },
      { year: 2024, driver: "Charles Leclerc", team: "Ferrari", teamColor: "#DC0000" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2022, driver: "Sergio Perez", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2019, driver: "Lewis Hamilton", team: "Mercedes", teamColor: "#27F4D2" },
    ],
  },
  "british-gp": {
    circuitSlug: "british-gp",
    mostWins: { driver: "Lewis Hamilton", wins: 9 },
    winners: [
      { year: 2025, driver: "Lando Norris", team: "McLaren", teamColor: "#FF8700", lapRecord: "1:27.097" },
      { year: 2024, driver: "Lewis Hamilton", team: "Mercedes", teamColor: "#27F4D2" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2022, driver: "Carlos Sainz", team: "Ferrari", teamColor: "#DC0000" },
      { year: 2021, driver: "Lewis Hamilton", team: "Mercedes", teamColor: "#27F4D2" },
      { year: 2020, driver: "Lewis Hamilton", team: "Mercedes", teamColor: "#27F4D2" },
    ],
  },
  "italian-gp": {
    circuitSlug: "italian-gp",
    mostWins: { driver: "Lewis Hamilton", wins: 5 },
    winners: [
      { year: 2025, driver: "Oscar Piastri", team: "McLaren", teamColor: "#FF8700", lapRecord: "1:21.046" },
      { year: 2024, driver: "Charles Leclerc", team: "Ferrari", teamColor: "#DC0000" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2021, driver: "Daniel Ricciardo", team: "McLaren", teamColor: "#FF8700" },
      { year: 2020, driver: "Pierre Gasly", team: "AlphaTauri", teamColor: "#ffffff" },
    ],
  },
  "australian-gp": {
    circuitSlug: "australian-gp",
    mostWins: { driver: "Michael Schumacher", wins: 4 },
    winners: [
      { year: 2025, driver: "George Russell", team: "Mercedes", teamColor: "#27F4D2", lapRecord: "1:19.813" },
      { year: 2024, driver: "Carlos Sainz", team: "Ferrari", teamColor: "#DC0000" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2022, driver: "Charles Leclerc", team: "Ferrari", teamColor: "#DC0000" },
      { year: 2019, driver: "Valtteri Bottas", team: "Mercedes", teamColor: "#27F4D2" },
      { year: 2018, driver: "Sebastian Vettel", team: "Ferrari", teamColor: "#DC0000" },
    ],
  },
  "japanese-gp": {
    circuitSlug: "japanese-gp",
    mostWins: { driver: "Michael Schumacher", wins: 6 },
    winners: [
      { year: 2025, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6", lapRecord: "1:30.983" },
      { year: 2024, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2019, driver: "Valtteri Bottas", team: "Mercedes", teamColor: "#27F4D2" },
      { year: 2018, driver: "Lewis Hamilton", team: "Mercedes", teamColor: "#27F4D2" },
    ],
  },
  "bahrain-gp": {
    circuitSlug: "bahrain-gp",
    mostWins: { driver: "Lewis Hamilton", wins: 5 },
    winners: [
      { year: 2025, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6", lapRecord: "1:31.447" },
      { year: 2024, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2022, driver: "Charles Leclerc", team: "Ferrari", teamColor: "#DC0000" },
      { year: 2021, driver: "Lewis Hamilton", team: "Mercedes", teamColor: "#27F4D2" },
      { year: 2020, driver: "Lewis Hamilton", team: "Mercedes", teamColor: "#27F4D2" },
    ],
  },
  "belgian-gp": {
    circuitSlug: "belgian-gp",
    mostWins: { driver: "Michael Schumacher", wins: 6 },
    winners: [
      { year: 2025, driver: "Lando Norris", team: "McLaren", teamColor: "#FF8700", lapRecord: "1:46.286" },
      { year: 2024, driver: "Lewis Hamilton", team: "Mercedes", teamColor: "#27F4D2" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2020, driver: "Lewis Hamilton", team: "Mercedes", teamColor: "#27F4D2" },
    ],
  },
  "miami-gp": {
    circuitSlug: "miami-gp",
    mostWins: { driver: "Max Verstappen", wins: 2 },
    winners: [
      { year: 2025, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6", lapRecord: "1:29.708" },
      { year: 2024, driver: "Lando Norris", team: "McLaren", teamColor: "#FF8700" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6" },
    ],
  },
};
