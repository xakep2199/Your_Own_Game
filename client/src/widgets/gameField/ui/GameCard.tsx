import { useState } from "react";
import {
  type ITheme,
  getQuestionThunk,
  answerQuestionThunk,
  addAnsweredCard,
  clearCurrentQuestion,
} from "@/entities";
import { useAppDispatch, useAppSelector } from "@/shared";
import styles from "./GameCard.module.css";

type QuestionPointsType = 200 | 400 | 600 | 800;

interface GameCardProps {
  points: QuestionPointsType;
  theme: ITheme;
  isAnswered: boolean;
  onAnswer: (points: number) => void;
}

export function GameCard({
  points,
  theme,
  isAnswered,
  onAnswer,
}: GameCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const dispatch = useAppDispatch();
  const { currentQuestion, lastAnswer, isLoading } = useAppSelector(
    (state) => state.game
  );

  const handleCardClick = async () => {
    if (isAnswered || isFlipped) return;

    try {
      await dispatch(getQuestionThunk({ themeId: theme.id, points })).unwrap();
      setIsFlipped(true);
    } catch (error) {
      console.error("Ошибка при получении вопроса:", error);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    try {
      await dispatch(
        answerQuestionThunk({
          questionId: currentQuestion.id,
          answer: userAnswer.trim(),
        })
      ).unwrap();

      if (lastAnswer) {
        setShowAnswer(true);
        onAnswer(lastAnswer.points);

        if (lastAnswer.correct) {
          const cardKey = `${theme.id}-${points}`;
          dispatch(addAnsweredCard(cardKey));
        }
      }
    } catch (error) {
      console.error("Ошибка при отправке ответа:", error);
    }
  };

  const handleClose = () => {
    setIsFlipped(false);
    setUserAnswer("");
    setShowAnswer(false);
    dispatch(clearCurrentQuestion());
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
