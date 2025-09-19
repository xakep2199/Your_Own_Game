import { configureStore } from "@reduxjs/toolkit";
import {
  questionsReducer,
  themeReducer,
  statisticsReducer,
  userReducer,
  gameReducer,
  scoreReducer,
} from "@/entities";
import { gameSessionMiddleware } from "../middleware/gameSessionMiddleware";

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    statistics: statisticsReducer,
    questions: questionsReducer,
    game: gameReducer,
    score: scoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameSessionMiddleware),
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
