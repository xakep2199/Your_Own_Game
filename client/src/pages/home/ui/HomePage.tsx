import { useState, useEffect } from "react";
import { GameThemes, GameField } from "@/widgets";
import { type ITheme, resetGame } from "@/entities";
import { useAppDispatch, useAppSelector, CLIENT_ROUTES } from "@/shared";
import { NavLink } from "react-router-dom";
import styles from "./HomePage.module.css";

export function HomePage() {
  const [selectedTheme, setSelectedTheme] = useState<ITheme | null>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  // Сброс состояния игры при выходе пользователя
  useEffect(() => {
    if (!user) {
      setSelectedTheme(null);
      dispatch(resetGame());
    }
  }, [user, dispatch]);

  const handleThemeSelect = (theme: ITheme) => {
    setSelectedTheme(theme);
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
            <GameThemes
              selectedTheme={selectedTheme}
              onThemeSelect={handleThemeSelect}
            />
          </div>

          <div className={styles.gameField}>
            <GameField selectedTheme={selectedTheme} />
          </div>
        </div>
      )}
    </div>
  );
}
