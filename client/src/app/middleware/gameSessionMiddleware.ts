import type { Middleware } from "@reduxjs/toolkit";

const GAME_SESSION_KEY = "gameSession";

// Тип для игровой сессии
export interface GameSession {
  isActive: boolean;
  currentThemeId: number | null;
  currentThemeName: string | null;
  sessionScore: number;
  answeredQuestions: number;
  totalQuestions: number;
  sessionId: string;
  startTime: number;
}

// Тип для состояния игры
interface GameState {
  gameSession: GameSession;
}

// Тип для корневого состояния
interface RootState {
  game: GameState;
}

export const gameSessionMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    // Сохраняем состояние игровой сессии в localStorage
    if (
      action &&
      typeof action === "object" &&
      "type" in action &&
      typeof action.type === "string" &&
      action.type.startsWith("game/")
    ) {
      const state = store.getState();
      const gameSession = state.game.gameSession;

      if (gameSession.isActive) {
        localStorage.setItem(GAME_SESSION_KEY, JSON.stringify(gameSession));
      } else {
        localStorage.removeItem(GAME_SESSION_KEY);
      }
    }

    return result;
  };

// Функция для восстановления состояния из localStorage
export const restoreGameSession = (): GameSession | null => {
  try {
    const savedSession = localStorage.getItem(GAME_SESSION_KEY);
    if (savedSession) {
      const parsedSession = JSON.parse(savedSession) as GameSession;

      // Валидация структуры сессии
      if (
        typeof parsedSession === "object" &&
        parsedSession !== null &&
        typeof parsedSession.isActive === "boolean" &&
        typeof parsedSession.currentThemeId === "number" &&
        typeof parsedSession.currentThemeName === "string" &&
        typeof parsedSession.sessionScore === "number" &&
        typeof parsedSession.answeredQuestions === "number" &&
        typeof parsedSession.totalQuestions === "number" &&
        typeof parsedSession.sessionId === "string" &&
        typeof parsedSession.startTime === "number"
      ) {
        return parsedSession;
      } else {
        console.warn("Неверная структура сохраненной игровой сессии");
        localStorage.removeItem(GAME_SESSION_KEY);
        return null;
      }
    }
  } catch (error) {
    console.error("Ошибка при восстановлении игровой сессии:", error);
    localStorage.removeItem(GAME_SESSION_KEY);
  }
  return null;
};
