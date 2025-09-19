import { useEffect } from "react";
import { GameCard } from "./GameCard";
import { type ITheme, getTotalScoreThunk } from "@/entities";
import { useAppDispatch, useAppSelector } from "@/shared";
import styles from "./GameField.module.css";

const QUESTION_POINTS = [200, 400, 600, 800] as const;

interface GameFieldProps {
  selectedTheme: ITheme | null;
}

export function GameField({ selectedTheme }: GameFieldProps) {
  const dispatch = useAppDispatch();
  const { answeredCards } = useAppSelector((state) => state.game);
  const { totalScore } = useAppSelector((state) => state.score);

  useEffect(() => {
    dispatch(getTotalScoreThunk());
  }, [dispatch]);

  const handleAnswer = (points: number) => {
    if (points > 0) {
      dispatch(getTotalScoreThunk());
    }
  };

  const isCardAnswered = (points: number) => {
    if (!selectedTheme) return false;
    const cardKey = `${selectedTheme.id}-${points}`;
    return answeredCards.includes(cardKey);
  };

  if (!selectedTheme) {
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          <h3>Выберите тему для начала игры</h3>
          <p>Выберите тему из списка слева, чтобы увидеть игровое поле</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.themeTitle}>{selectedTheme.name}</h2>
        <div className={styles.score}>Счет: {totalScore}</div>
      </div>

      <div className={styles.gameGrid}>
        {QUESTION_POINTS.map((points) => (
          <GameCard
            key={points}
            points={points}
            theme={selectedTheme}
            isAnswered={isCardAnswered(points)}
            onAnswer={handleAnswer}
          />
        ))}
      </div>
    </div>
  );
}
