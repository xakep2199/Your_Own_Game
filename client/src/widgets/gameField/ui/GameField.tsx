import { useEffect, useState } from "react";
import { GameCard } from "./GameCard";
import { type ITheme, resetGame, updateSessionScore } from "@/entities";
import { useAppDispatch, useAppSelector } from "@/shared";
import type { GameSession } from "@/app/middleware/gameSessionMiddleware";
import styles from "./GameField.module.css";

const QUESTION_POINTS = [200, 400, 600, 800] as const;

interface GameFieldProps {
  selectedTheme: ITheme | null;
  gameSession: GameSession;
  onGameComplete: () => void;
}

export function GameField({
  selectedTheme,
  gameSession,
  onGameComplete,
}: GameFieldProps) {
  const dispatch = useAppDispatch();
  const { answeredCards } = useAppSelector((state) => state.game);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Сброс состояния игры при смене темы
  useEffect(() => {
    if (selectedTheme) {
      dispatch(resetGame());
      setActiveCard(null);
    }
  }, [selectedTheme, dispatch]);

  const handleAnswer = (points: number) => {
    // Обновляем счет сессии
    dispatch(updateSessionScore(points));

    // Проверяем, завершена ли игра
    if (gameSession.answeredQuestions + 1 >= gameSession.totalQuestions) {
      // Игра завершена, показываем результат
      setTimeout(() => {
        onGameComplete();
      }, 2000); // Даем время на показ результата
    }
  };

  const handleCardOpen = (points: number) => {
    setActiveCard(points);
  };

  const handleCardClose = () => {
    setActiveCard(null);
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
        <div className={styles.scoreInfo}>
          <div className={styles.score}>
            Счет сессии: {gameSession.sessionScore}
          </div>
          <div className={styles.progress}>
            Вопросов: {gameSession.answeredQuestions}/
            {gameSession.totalQuestions}
          </div>
        </div>
      </div>

      <div className={styles.gameGrid}>
        {QUESTION_POINTS.map((points) => (
          <GameCard
            key={points}
            points={points}
            theme={selectedTheme}
            isAnswered={isCardAnswered(points)}
            isActive={activeCard === points}
            onAnswer={handleAnswer}
            onCardOpen={handleCardOpen}
            onCardClose={handleCardClose}
          />
        ))}
      </div>
    </div>
  );
}
