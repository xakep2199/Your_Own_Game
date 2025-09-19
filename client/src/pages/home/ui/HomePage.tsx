import { useState, useEffect } from "react";
import { GameThemes, GameField } from "@/widgets";
import {
  type ITheme,
  resetGame,
  startGameSession,
  endGameSession,
  restoreSession,
} from "@/entities";
import { useAppDispatch, useAppSelector, CLIENT_ROUTES } from "@/shared";
import { NavLink } from "react-router-dom";
import { restoreGameSession } from "@/app/middleware/gameSessionMiddleware";
import styles from "./HomePage.module.css";

export function HomePage() {
  const [selectedTheme, setSelectedTheme] = useState<ITheme | null>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { gameSession } = useAppSelector((state) => state.game);

  // Восстановление игровой сессии при загрузке
  useEffect(() => {
    if (user) {
      const savedSession = restoreGameSession();
      if (savedSession && savedSession.isActive) {
        // Восстанавливаем сессию с сохраненными данными
        dispatch({
          type: "game/startGameSession",
          payload: {
            themeId: savedSession.currentThemeId,
            themeName: savedSession.currentThemeName,
          },
        });
        // Восстанавливаем счет и прогресс
        dispatch({
          type: "game/updateSessionScore",
          payload: 0,
        });
        // Устанавливаем сохраненные значения
        dispatch(restoreSession(savedSession));
      }
    }
  }, [user, dispatch]);

  // Сброс состояния игры при выходе пользователя
  useEffect(() => {
    if (!user) {
      setSelectedTheme(null);
      dispatch(resetGame());
    }
  }, [user, dispatch]);

  const handleThemeSelect = (theme: ITheme) => {
    if (!gameSession.isActive) {
      setSelectedTheme(theme);
      dispatch(
        startGameSession({
          themeId: theme.id,
          themeName: theme.name,
        })
      );
    }
  };

  const handleEndGame = () => {
    dispatch(endGameSession());
    setSelectedTheme(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>СВОЯ ИГРА</h1>
      </div>

      {!user ? (
        <div className={styles.authPrompt}>
          <div className={styles.authMessage}>
            <h2>Добро пожаловать в игру!</h2>
            <p>Чтобы начать играть, войдите в систему или зарегистрируйтесь</p>
            <div className={styles.authButtons}>
              <NavLink to={CLIENT_ROUTES.AUTH} className={styles.authButton}>
                Войти / Зарегистрироваться
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.gameContainer}>
          <div className={styles.sidebar}>
            {gameSession.isActive ? (
              <div className={styles.gameSessionInfo}>
                <h3>Игровая сессия</h3>
                <p>Тема: {gameSession.currentThemeName}</p>
                <p>Счет: {gameSession.sessionScore}</p>
                <p>
                  Вопросов отвечено: {gameSession.answeredQuestions}/
                  {gameSession.totalQuestions}
                </p>
                <button
                  onClick={handleEndGame}
                  className={styles.endGameButton}
                >
                  Завершить игру
                </button>
              </div>
            ) : (
              <GameThemes
                selectedTheme={selectedTheme}
                onThemeSelect={handleThemeSelect}
              />
            )}
          </div>

          <div className={styles.gameField}>
            <GameField
              selectedTheme={selectedTheme}
              gameSession={gameSession}
              onGameComplete={handleEndGame}
            />
          </div>
        </div>
      )}
    </div>
  );
}
