import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "@/entities";
import { statisticsReducer } from "@/entities/statistics/slice/statisticsSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        statistics: statisticsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;