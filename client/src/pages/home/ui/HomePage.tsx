import { useState } from "react";
import { GameThemes, GameField } from "@/widgets";
import { type ITheme } from "@/entities";
import styles from "./HomePage.module.css";

export function HomePage() {
  const [selectedTheme, setSelectedTheme] = useState<ITheme | null>(null);

  const handleThemeSelect = (theme: ITheme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>СВОЯ ИГРА</h1>
      </div>

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
    </div>
  );
}
