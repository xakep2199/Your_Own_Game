import { createSlice } from "@reduxjs/toolkit";
import { type StatisticsArrayType } from "../model/statisticsModel";
import { getAllStatisticsByUserIdThunk } from "../api/statisticsService";
    
type StatisticsState = {
    statistics: StatisticsArrayType;
    isLoading: boolean;
    error: string | null;
};

const initialState: StatisticsState = {
    statistics: [],
    isLoading: false,
    error: null,
};

const statisticsSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllStatisticsByUserIdThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllStatisticsByUserIdThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.statistics = action.payload;
                state.error = null;
            })
            .addCase(getAllStatisticsByUserIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Ошибка при получении статистики";
            });
    }
});

export const statisticsReducer = statisticsSlice.reducer;