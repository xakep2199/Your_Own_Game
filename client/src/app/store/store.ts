import { configureStore } from "@reduxjs/toolkit";
import { questionsReducer, themeReducer, statisticsReducer, userReducer } from "@/entities";


export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        statistics: statisticsReducer,
        questions: questionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;