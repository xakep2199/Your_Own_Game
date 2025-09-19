import { useEffect } from "react";
import { getAllThemesThunk, type ITheme } from "@/entities";
import styles from "./GameThemes.module.css";
import { useAppDispatch, useAppSelector } from "@/shared";

// Моковые темы для демонстрации
// const MOCK_THEMES: ITheme[] = [
//   { id: 1, name: "История", createdAt: new Date(), updatedAt: new Date() },
//   { id: 2, name: "География", createdAt: new Date(), updatedAt: new Date() },
//   { id: 3, name: "Наука", createdAt: new Date(), updatedAt: new Date() },
//   { id: 4, name: "Литература", createdAt: new Date(), updatedAt: new Date() },
//   { id: 5, name: "Спорт", createdAt: new Date(), updatedAt: new Date() },
//   { id: 6, name: "Искусство", createdAt: new Date(), updatedAt: new Date() },
// ];

interface GameThemesProps {
  selectedTheme: ITheme | null;
  onThemeSelect: (theme: ITheme) => void;
}

export function GameThemes({ selectedTheme, onThemeSelect }: GameThemesProps) {
  // const [themes, setThemes] = useState<ITheme[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  const { themes, isLoading} = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // setTimeout(() => {
    //   setThemes(MOCK_THEMES);
    //   setIsLoading(false);
    // }, 1000);
    dispatch(getAllThemesThunk());
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка тем...</div>
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
