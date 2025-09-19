import { useState, useEffect } from "react";
import {
  type ITheme,
  getQuestionThunk,
  answerQuestionThunk,
  addAnsweredCard,
} from "@/entities";
import { useAppDispatch, useAppSelector } from "@/shared";
import styles from "./GameCard.module.css";

type QuestionPointsType = 200 | 400 | 600 | 800;

interface GameCardProps {
  points: QuestionPointsType;
  theme: ITheme;
  isAnswered: boolean;
  isActive: boolean;
  onAnswer: () => void;
  onCardOpen: (points: number) => void;
  onCardClose: () => void;
}

export function GameCard({
  points,
  theme,
  isAnswered,
  isActive,
  onAnswer,
  onCardOpen,
  onCardClose,
}: GameCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [lastAnswer, setLastAnswer] = useState<any>(null);

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.game);

  // Сброс состояния карточки при смене темы
  useEffect(() => {
    setIsFlipped(false);
    setUserAnswer("");
    setShowAnswer(false);
    setCurrentQuestion(null);
    setLastAnswer(null);
  }, [theme.id]);

  // Закрытие карточки, если она не активна
  useEffect(() => {
    if (!isActive && isFlipped) {
      setIsFlipped(false);
      setUserAnswer("");
      setShowAnswer(false);
      setCurrentQuestion(null);
      setLastAnswer(null);
    }
  }, [isActive, isFlipped]);

  const handleCardClick = async () => {
    if (isAnswered || isFlipped) return;

    try {
      const result = await dispatch(
        getQuestionThunk({ themeId: theme.id, points })
      ).unwrap();
      setCurrentQuestion(result.data);
      setIsFlipped(true);
      onCardOpen(points);
    } catch (error) {
      console.error("Ошибка при получении вопроса:", error);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    try {
      const result = await dispatch(
        answerQuestionThunk({
          questionId: currentQuestion.id,
          answer: userAnswer.trim(),
        })
      ).unwrap();

      setLastAnswer(result.data);
      setShowAnswer(true);

      // Вызываем onAnswer для обновления счета
      onAnswer();

      if (result.data.correct) {
        const cardKey = `${theme.id}-${points}`;
        dispatch(addAnsweredCard(cardKey));
      }
    } catch (error) {
      console.error("Ошибка при отправке ответа:", error);
    }
  };

  const handleClose = () => {
    setIsFlipped(false);
    setUserAnswer("");
    setShowAnswer(false);
    setCurrentQuestion(null);
    setLastAnswer(null);
    onCardClose();
  };

  if (isAnswered) {
    return (
      <div className={`${styles.card} ${styles.answered}`}>
        <div className={styles.points}>✓</div>
      </div>
    );
  }

  if (isFlipped && currentQuestion) {
    return (
      <div className={`${styles.card} ${styles.flipped}`}>
        <div className={styles.questionContent}>
          <div className={styles.question}>{currentQuestion.question}</div>

          {!showAnswer ? (
            <div className={styles.answerInput}>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Введите ваш ответ..."
                className={styles.input}
                onKeyPress={(e) => e.key === "Enter" && handleSubmitAnswer()}
                autoFocus
              />
              <button
                onClick={handleSubmitAnswer}
                className={styles.submitButton}
                disabled={!userAnswer.trim() || isLoading}
              >
                {isLoading ? "..." : "Ответить"}
              </button>
            </div>
          ) : (
            <div className={styles.result}>
              <div
                className={`${styles.resultText} ${
                  lastAnswer?.correct ? styles.correct : styles.incorrect
                }`}
              >
                {lastAnswer?.correct ? "Правильно!" : "Неправильно!"}
              </div>
              <div className={styles.correctAnswer}>
                Правильный ответ: {currentQuestion.correctAnswer}
              </div>
              <div className={styles.pointsEarned}>
                Получено очков: {lastAnswer?.points || 0}
              </div>
              <button onClick={handleClose} className={styles.closeButton}>
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.card}
      onClick={handleCardClick}
      style={{ cursor: isLoading ? "wait" : "pointer" }}
    >
      <div className={styles.points}>{points}</div>
    </div>
  );
}
