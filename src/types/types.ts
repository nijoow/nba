interface Game {
  id: number;
  date: string;
  home_team: TeamStats;
  visitor_team: TeamStats;
  season: number;
  period: number | null;
  status: string;
  time: string | null;
  postseason: boolean;
  home_team_score: number;
  visitor_team_score: number;
}

interface TeamStats {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
  logo: string | null;
}

export interface AllGamesResponse {
  data: Game[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: number | null;
    per_page: number;
    total_count: number;
  };
}
