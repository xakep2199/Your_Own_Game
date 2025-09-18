import { createSlice } from "@reduxjs/toolkit";
import { getAllThemesThunk, getThemeByIdThunk } from "../api/ThemeThunkApi";
import type { ITheme, ThemeArrayType } from "../model";

type ThemeState = {
  themes: ThemeArrayType;
  theme: ITheme | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: ThemeState = {
  themes: [],
  theme: null,
  isLoading: false,
  error: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllThemesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllThemesThunk.fulfilled, (state, action) => {
        state.themes = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllThemesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Something went wrong";
      })
      .addCase(getThemeByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getThemeByIdThunk.fulfilled, (state, action) => {
        state.theme = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getThemeByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Something went wrong";
      });
  },
});

export const themeReducer = themeSlice.reducer;