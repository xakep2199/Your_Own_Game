import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { getAllThemesThunk, type ITheme } from "@/entities";
import type { RootState } from "@/app/store/store";
import styles from "./GameThemes.module.css";

interface GameThemesProps {
  selectedTheme: ITheme | null;
  onThemeSelect: (theme: ITheme) => void;
}

export function GameThemes({ selectedTheme, onThemeSelect }: GameThemesProps) {
  const dispatch = useAppDispatch();
  const { themes, isLoading, error } = useAppSelector(
    (state: RootState) => state.theme
  );

  useEffect(() => {
    dispatch(getAllThemesThunk());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка тем...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Ошибка: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Темы</h3>
      <div className={styles.themesList}>
        {themes.map((theme: ITheme) => (
          <button
            key={theme.id}
            className={`${styles.themeButton} ${
              selectedTheme?.id === theme.id ? styles.selected : ""
            }`}
            onClick={() => onThemeSelect(theme)}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}
