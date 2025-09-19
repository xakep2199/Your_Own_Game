export interface IScore {
  id: number;
  userId: number;
  themeId: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateScoreRequest {
  points: number;
}

export interface ITotalScore {
  totalScore: number;
}

export interface ILeaderboardEntry {
  id: number;
  userId: number;
  themeId: number;
  score: number;
  user?: {
    id: number;
    username: string;
  };
  theme?: {
    id: number;
    name: string;
  };
}

export type ScoreArrayType = Array<IScore>;
export type LeaderboardArrayType = Array<ILeaderboardEntry>;

export const SCORE_API_ROUTES = {
  GET_USER_SCORES: "/scores",
  GET_TOTAL_SCORE: "/scores/total",
  UPDATE_SCORE: "/scores/theme",
  RESET_SCORE: "/scores/theme",
  GET_LEADERBOARD: "/leaderboard",
} as const;

