import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axiosInstance, type ServerResponseType } from "@/shared";
import {
  type IScore,
  type ITotalScore,
  type ScoreArrayType,
  type LeaderboardArrayType,
  SCORE_API_ROUTES,
} from "../model";

export const getUserScoresThunk = createAsyncThunk<
  ServerResponseType<ScoreArrayType>,
  void,
  { rejectValue: ServerResponseType }
>("score/getUserScores", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      ServerResponseType<ScoreArrayType>
    >(SCORE_API_ROUTES.GET_USER_SCORES);
    return data;
  } catch (error) {
    const err = error as AxiosError<ServerResponseType>;
    return rejectWithValue(err.response!.data);
  }
});

export const getTotalScoreThunk = createAsyncThunk<
  ServerResponseType<ITotalScore>,
  void,
  { rejectValue: ServerResponseType }
>("score/getTotalScore", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ServerResponseType<ITotalScore>>(
      SCORE_API_ROUTES.GET_TOTAL_SCORE
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<ServerResponseType>;
    return rejectWithValue(err.response!.data);
  }
});

export const updateScoreThunk = createAsyncThunk<
  ServerResponseType,
  { themeId: number; points: number },
  { rejectValue: ServerResponseType }
>("score/updateScore", async ({ themeId, points }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put<ServerResponseType>(
      `${SCORE_API_ROUTES.UPDATE_SCORE}/${themeId}`,
      { points }
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<ServerResponseType>;
    return rejectWithValue(err.response!.data);
  }
});

export const resetScoreThunk = createAsyncThunk<
  ServerResponseType<IScore>,
  number,
  { rejectValue: ServerResponseType }
>("score/resetScore", async (themeId, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<ServerResponseType<IScore>>(
      `${SCORE_API_ROUTES.RESET_SCORE}/${themeId}`
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<ServerResponseType>;
    return rejectWithValue(err.response!.data);
  }
});

export const getLeaderboardThunk = createAsyncThunk<
  ServerResponseType<LeaderboardArrayType>,
  { themeId?: number; limit?: number },
  { rejectValue: ServerResponseType }
>(
  "score/getLeaderboard",
  async ({ themeId, limit = 10 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (themeId) params.append("themeId", themeId.toString());
      if (limit) params.append("limit", limit.toString());

      const queryString = params.toString();
      const url = queryString
        ? `${SCORE_API_ROUTES.GET_LEADERBOARD}?${queryString}`
        : SCORE_API_ROUTES.GET_LEADERBOARD;

      const { data } = await axiosInstance.get<
        ServerResponseType<LeaderboardArrayType>
      >(url);
      return data;
    } catch (error) {
      const err = error as AxiosError<ServerResponseType>;
      return rejectWithValue(err.response!.data);
    }
  }
);
