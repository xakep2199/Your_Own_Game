import { useState } from "react";
import { GameCard } from "./GameCard";
import { type ITheme, QUESTION_POINTS } from "@/entities";
import styles from "./GameField.module.css";

interface GameFieldProps {
  selectedTheme: ITheme | null;
}

export function GameField({ selectedTheme }: GameFieldProps) {
  const [answeredCards, setAnsweredCards] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswer = (points: number) => {
    if (selectedTheme) {
      const cardKey = `${selectedTheme.id}-${points}`;
      setAnsweredCards(prev => new Set([...prev, cardKey]));
      setTotalScore(prev => prev + points);
    }
  };

  const isCardAnswered = (points: number) => {
    if (!selectedTheme) return false;
    const cardKey = `${selectedTheme.id}-${points}`;
    return answeredCards.has(cardKey);
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
