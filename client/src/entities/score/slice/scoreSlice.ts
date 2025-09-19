import { createSlice } from "@reduxjs/toolkit";
import type {

  ScoreArrayType,
  LeaderboardArrayType,
} from "../model";
import {
  getUserScoresThunk,
  getTotalScoreThunk,
  updateScoreThunk,
  resetScoreThunk,
  getLeaderboardThunk,
} from "../api/scoreThunkApi";

interface ScoreState {
  userScores: ScoreArrayType;
  totalScore: number;
  leaderboard: LeaderboardArrayType;
  isLoading: boolean;
  error: string | null;
}

const initialState: ScoreState = {
  userScores: [],
  totalScore: 0,
  leaderboard: [],
  isLoading: false,
  error: null,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetScores: (state) => {
      state.userScores = [];
      state.totalScore = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserScoresThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserScoresThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userScores = action.payload.data;
      })
      .addCase(getUserScoresThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Ошибка при получении очков";
      })
      .addCase(getTotalScoreThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTotalScoreThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalScore = action.payload.data.totalScore;
      })
      .addCase(getTotalScoreThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.error || "Ошибка при получении общего счета";
      })
      .addCase(updateScoreThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateScoreThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateScoreThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Ошибка при обновлении очков";
      })
      .addCase(resetScoreThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetScoreThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetScoreThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Ошибка при сбросе очков";
      })
      .addCase(getLeaderboardThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLeaderboardThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaderboard = action.payload.data;
      })
      .addCase(getLeaderboardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.error || "Ошибка при получении таблицы лидеров";
      });
  },
});

export const { clearError, resetScores } = scoreSlice.actions;
export const scoreReducer = scoreSlice.reducer;

