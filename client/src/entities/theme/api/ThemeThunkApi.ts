import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axiosInstance, type ServerResponseType } from "@/shared";
import type { ITheme, ThemeArrayType } from "@/entities";

export const getAllThemesThunk = createAsyncThunk<
  ServerResponseType<ThemeArrayType>,
  void,
  { rejectValue: ServerResponseType }
>("theme/getAllThemes", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      ServerResponseType<ThemeArrayType>
    >("/themes");
    return data;
  } catch (error) {
    const err = error as AxiosError<ServerResponseType>;
    return rejectWithValue(err.response!.data);
  }
});

export const getThemeByIdThunk = createAsyncThunk<
  ServerResponseType<ITheme>,
  number,
  { rejectValue: ServerResponseType }
>("theme/getThemeById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ServerResponseType<ITheme>>(
      `/themes/${id}`
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<ServerResponseType>;
    return rejectWithValue(err.response!.data);
  }
});
