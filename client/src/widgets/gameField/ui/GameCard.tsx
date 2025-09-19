import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import {
  getQuestionByThemeAndPointsThunk,
  answerQuestionThunk,
  clearCurrentQuestion,
  clearGameAnswer,
  type ITheme,
  type QuestionPointsType,
} from "@/entities";
import type { RootState } from "@/app/store/store";
import styles from "./GameCard.module.css";

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
  const dispatch = useAppDispatch();
  const { currentQuestion, gameAnswer, isLoading } = useAppSelector(
    (state: RootState) => state.question
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const isCurrentCard =
    currentQuestion?.themeId === theme.id && currentQuestion?.points === points;

  const handleCardClick = async () => {
    if (isAnswered || isCurrentCard) return;

    dispatch(clearCurrentQuestion());
    dispatch(clearGameAnswer());
    await dispatch(
      getQuestionByThemeAndPointsThunk({
        themeId: theme.id,
        points,
      })
    );
    setIsFlipped(true);
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    const result = await dispatch(
      answerQuestionThunk({
        questionId: currentQuestion.id,
        userAnswer: userAnswer.trim(),
      })
    );

    if (answerQuestionThunk.fulfilled.match(result)) {
      setShowAnswer(true);
      onAnswer(result.payload.data.points);
    }
  };

  const handleClose = () => {
    setIsFlipped(false);
    setUserAnswer("");
    setShowAnswer(false);
    dispatch(clearCurrentQuestion());
    dispatch(clearGameAnswer());
  };

  if (isAnswered) {
    return (
      <div className={`${styles.card} ${styles.answered}`}>
        <div className={styles.points}>✓</div>
      </div>
    );
  }

  if (isCurrentCard && isFlipped) {
    return (
      <div className={`${styles.card} ${styles.flipped}`}>
        <div className={styles.questionContent}>
          <div className={styles.question}>{currentQuestion?.question}</div>

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
                  gameAnswer?.correct ? styles.correct : styles.incorrect
                }`}
              >
                {gameAnswer?.correct ? "Правильно!" : "Неправильно!"}
              </div>
              <div className={styles.correctAnswer}>
                Правильный ответ: {currentQuestion?.correctAnswer}
              </div>
              <div className={styles.pointsEarned}>
                Получено очков: {gameAnswer?.points || 0}
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
