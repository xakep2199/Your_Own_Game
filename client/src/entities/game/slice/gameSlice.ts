import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IGameQuestion, IAnswerResponse, IGameStats } from "../model";
import type { GameSession } from "@/app/middleware/gameSessionMiddleware";
import {
  getQuestionThunk,
  answerQuestionThunk,
  getGameStatsThunk,
} from "../api/gameThunkApi";

interface GameState {
  currentQuestion: IGameQuestion | null;
  lastAnswer: IAnswerResponse | null;
  gameStats: IGameStats | null;
  isLoading: boolean;
  error: string | null;
  answeredCards: string[];
  gameSession: GameSession;
}

const initialState: GameState = {
  currentQuestion: null,
  lastAnswer: null,
  gameStats: null,
  isLoading: false,
  error: null,
  answeredCards: [],
  gameSession: {
    isActive: false,
    currentThemeId: null,
    currentThemeName: null,
    sessionScore: 0,
    answeredQuestions: 0,
    totalQuestions: 4,
    sessionId: "",
    startTime: 0,
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clearCurrentQuestion: (state) => {
      state.currentQuestion = null;
      state.lastAnswer = null;
    },
    addAnsweredCard: (state, action: PayloadAction<string>) => {
      if (!state.answeredCards.includes(action.payload)) {
        state.answeredCards.push(action.payload);
      }
    },
    resetGame: (state) => {
      state.currentQuestion = null;
      state.lastAnswer = null;
      state.answeredCards = [];
      state.error = null;
      state.gameSession = {
        isActive: false,
        currentThemeId: null,
        currentThemeName: null,
        sessionScore: 0,
        answeredQuestions: 0,
        totalQuestions: 4,
        sessionId: "",
        startTime: 0,
      };
    },
    startGameSession: (
      state,
      action: PayloadAction<{ themeId: number; themeName: string }>
    ) => {
      state.gameSession = {
        isActive: true,
        currentThemeId: action.payload.themeId,
        currentThemeName: action.payload.themeName,
        sessionScore: 0,
        answeredQuestions: 0,
        totalQuestions: 4,
        sessionId: `session_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        startTime: Date.now(),
      };
    },
    updateSessionScore: (state, action: PayloadAction<number>) => {
      state.gameSession.sessionScore += action.payload;
      state.gameSession.answeredQuestions += 1;
    },
    endGameSession: (state) => {
      state.gameSession.isActive = false;
      state.currentQuestion = null;
      state.lastAnswer = null;
      state.answeredCards = [];
    },
    restoreSession: (state, action: PayloadAction<GameSession>) => {
      state.gameSession = action.payload;
    },
    restoreAnsweredCards: (state, action: PayloadAction<string[]>) => {
      state.answeredCards = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getQuestionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentQuestion = action.payload.data;
      })
      .addCase(getQuestionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Ошибка при получении вопроса";
      })
      .addCase(answerQuestionThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(answerQuestionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastAnswer = action.payload.data;
      })
      .addCase(answerQuestionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Ошибка при отправке ответа";
      })
      .addCase(getGameStatsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGameStatsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gameStats = action.payload.data;
      })
      .addCase(getGameStatsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.error || "Ошибка при получении статистики";
      });
  },
});

export const {
  clearCurrentQuestion,
  addAnsweredCard,
  resetGame,
  clearError,
  startGameSession,
  updateSessionScore,
  endGameSession,
  restoreSession,
  restoreAnsweredCards,
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
