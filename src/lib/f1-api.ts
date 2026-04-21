const BASE_URL = "https://api.openf1.org/v1";

export interface Session {
  session_key: number;
  session_name: string;
  date_start: string;
  circuit_short_name: string;
  country_name: string;
  location: string;
  meeting_key: number;
}

export interface ChampionshipDriver {
  driver_number: number;
  position_current: number;
  points_current: number;
}

export interface DriverEnrichment {
  driver_number: number;
  full_name: string;
  team_name: string;
  team_colour: string;
  headshot_url: string;
}

export async function fetch2026Calendar(): Promise<Session[]> {
  try {
    const res = await fetch(`${BASE_URL}/sessions?year=2026&session_type=Race`);
    if (!res.ok) throw new Error("Failed to fetch calendar");
    const data: Session[] = await res.json();
    
    // Sort by date and unique meetings (differentiate Sprint vs Race)
    return data.sort((a, b) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime());
  } catch (error) {
    console.error("OpenF1 API Error (Calendar):", error);
    return [];
  }
}

export async function fetchDriverStandings() {
  try {
    // 1. Get all 2026 Race sessions to find the latest completed
    const sessionsRes = await fetch(`${BASE_URL}/sessions?year=2026&session_type=Race`);
    const sessions: Session[] = await sessionsRes.json();
    
    const now = new Date();
    const completedSessions = sessions
      .filter(s => new Date(s.date_start) < now)
      .sort((a, b) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime());

    if (completedSessions.length === 0) return [];

    const latestSessionKey = completedSessions[0].session_key;

    // 2. Fetch championship points
    const pointsRes = await fetch(`${BASE_URL}/championship_drivers?session_key=${latestSessionKey}`);
    const pointsData: ChampionshipDriver[] = await pointsRes.json();

    // 3. Fetch driver enrichment (names, teams)
    const driversRes = await fetch(`${BASE_URL}/drivers?session_key=${latestSessionKey}`);
    const driversData: DriverEnrichment[] = await driversRes.json();

    // 4. Merge data
    const standings = pointsData.map(p => {
      const enrichment = driversData.find(d => d.driver_number === p.driver_number);
      return {
        ...p,
        name: enrichment?.full_name || `Driver ${p.driver_number}`,
        team: enrichment?.team_name || "Unknown Team",
        color: enrichment?.team_colour ? `#${enrichment.team_colour}` : "#ffffff",
        image: enrichment?.headshot_url || "/images/driver-placeholder.png"
      };
    }).sort((a, b) => a.position_current - b.position_current);

    return standings;
  } catch (error) {
    console.error("OpenF1 API Error (Standings):", error);
    return [];
  }
}
