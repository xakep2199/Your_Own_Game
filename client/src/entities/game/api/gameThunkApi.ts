import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axiosInstance, type ServerResponseType } from "@/shared";
import {
  type IGameQuestion,
  type IAnswerRequest,
  type IAnswerResponse,
  type IGameStats,
  GAME_API_ROUTES,
} from "../model";

export const getQuestionThunk = createAsyncThunk<
  ServerResponseType<IGameQuestion>,
  { themeId: number; points: number },
  { rejectValue: ServerResponseType }
>("game/getQuestion", async ({ themeId, points }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ServerResponseType<IGameQuestion>>(
      `${GAME_API_ROUTES.GET_QUESTION}/${themeId}/${points}`
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<ServerResponseType>;
    return rejectWithValue(err.response!.data);
  }
});

export const answerQuestionThunk = createAsyncThunk<
  ServerResponseType<IAnswerResponse>,
  { questionId: number; answer: string },
  { rejectValue: ServerResponseType }
>(
  "game/answerQuestion",
  async ({ questionId, answer }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<
        ServerResponseType<IAnswerResponse>
      >(`${GAME_API_ROUTES.ANSWER_QUESTION}/${questionId}`, { answer });
      return data;
    } catch (error) {
      const err = error as AxiosError<ServerResponseType>;
      return rejectWithValue(err.response!.data);
    }
  }
);

export const getGameStatsThunk = createAsyncThunk<
  ServerResponseType<IGameStats>,
  void,
  { rejectValue: ServerResponseType }
>("game/getGameStats", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ServerResponseType<IGameStats>>(
      GAME_API_ROUTES.GET_GAME_STATS
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<ServerResponseType>;
    return rejectWithValue(err.response!.data);
  }
});
