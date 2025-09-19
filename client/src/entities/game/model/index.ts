export interface IGameQuestion {
  id: number;
  question: string;
  correctAnswer: string;
  points: number;
  themeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnswerRequest {
  answer: string;
}

export interface IAnswerResponse {
  correct: boolean;
  points: number;
  correctAnswer?: string;
}

export interface IGameStats {
  totalScore: number;
  allScores: IUserScore[];
}

export interface IUserScore {
  id: number;
  userId: number;
  themeId: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UserScoreArrayType = Array<IUserScore>;

export const GAME_API_ROUTES = {
  GET_QUESTION: "/game/question",
  ANSWER_QUESTION: "/game/answer",
  GET_GAME_STATS: "/game/stats",
} as const;

