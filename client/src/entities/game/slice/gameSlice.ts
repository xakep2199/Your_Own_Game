import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IGameQuestion, IAnswerResponse, IGameStats } from "../model";
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
}

const initialState: GameState = {
  currentQuestion: null,
  lastAnswer: null,
  gameStats: null,
  isLoading: false,
  error: null,
  answeredCards: [],
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

export const { clearCurrentQuestion, addAnsweredCard, resetGame, clearError } =
  gameSlice.actions;
export const gameReducer = gameSlice.reducer;
