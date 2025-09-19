import { createSlice } from "@reduxjs/toolkit";
import { getQuestionsByThemeIdThunk, type QuestionArrayType } from "@/entities";

type QuestionState = {
  questions: QuestionArrayType;
  isLoading: boolean;
  error: string | null;
};

const initialState: QuestionState = {
  questions: [],
  isLoading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsByThemeIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionsByThemeIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload.data;
        state.error = null;
      })
      .addCase(getQuestionsByThemeIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Something went wrong";
      });
  },
});

export const questionsReducer = questionsSlice.reducer;
