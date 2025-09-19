import { configureStore } from "@reduxjs/toolkit";
import { themeReducer, statisticsReducer, questionReducer } from "@/entities";
import { userReducer } from "@/entities/user/slice/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    statistics: statisticsReducer,
    question: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
