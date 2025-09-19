import { useState } from "react";
import { type ITheme } from "@/entities";
import styles from "./GameCard.module.css";

type QuestionPointsType = 200 | 400 | 600 | 800;

// Моковые данные для вопросов
const MOCK_QUESTIONS = {
  200: [
    {
      question: "Какой цвет получается при смешивании красного и синего?",
      correctAnswer: "Фиолетовый",
    },
    { question: "Сколько дней в неделе?", correctAnswer: "Семь" },
    { question: "Как называется столица России?", correctAnswer: "Москва" },
    {
      question: "Какое животное является символом России?",
      correctAnswer: "Медведь",
    },
    {
      question: "Как называется самая большая планета Солнечной системы?",
      correctAnswer: "Юпитер",
    },
  ],
  400: [
    {
      question: "В каком году был основан Санкт-Петербург?",
      correctAnswer: "1703",
    },
    { question: "Кто написал роман 'Война и мир'?", correctAnswer: "Толстой" },
    {
      question: "Как называется процесс превращения воды в пар?",
      correctAnswer: "Испарение",
    },
    { question: "Сколько континентов на Земле?", correctAnswer: "Семь" },
    {
      question: "Как называется самая длинная река в мире?",
      correctAnswer: "Нил",
    },
  ],
  600: [
    {
      question: "Какой химический элемент имеет символ Au?",
      correctAnswer: "Золото",
    },
    { question: "В каком веке жил Леонардо да Винчи?", correctAnswer: "XV" },
    {
      question: "Как называется столица Австралии?",
      correctAnswer: "Канберра",
    },
    {
      question: "Кто открыл закон всемирного тяготения?",
      correctAnswer: "Ньютон",
    },
    {
      question: "Как называется самая высокая гора в мире?",
      correctAnswer: "Эверест",
    },
  ],
  800: [
    {
      question: "Какой математик сформулировал теорему о неполноте?",
      correctAnswer: "Гёдель",
    },
    {
      question: "В каком году произошла Октябрьская революция?",
      correctAnswer: "1917",
    },
    {
      question: "Как называется процесс деления клетки?",
      correctAnswer: "Митоз",
    },
    { question: "Кто написал 'Фауст'?", correctAnswer: "Гёте" },
    {
      question: "Как называется самая глубокая точка океана?",
      correctAnswer: "Марианская впадина",
    },
  ],
};

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
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: string;
    correctAnswer: string;
  } | null>(null);
  const [gameAnswer, setGameAnswer] = useState<{
    correct: boolean;
    points: number;
  } | null>(null);

  const handleCardClick = async () => {
    if (isAnswered || isFlipped) return;

    setIsLoading(true);
    setTimeout(() => {
      // Получаем случайный вопрос из моковых данных
      const questionsForPoints = MOCK_QUESTIONS[points];
      const randomQuestion =
        questionsForPoints[
          Math.floor(Math.random() * questionsForPoints.length)
        ];

      setCurrentQuestion({
        question: `[${theme.name}] ${randomQuestion.question}`,
        correctAnswer: randomQuestion.correctAnswer,
      });
      setIsLoading(false);
      setIsFlipped(true);
    }, 500);
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      // Более гибкая проверка ответа
      const userAnswerNormalized = userAnswer.toLowerCase().trim();
      const correctAnswerNormalized = currentQuestion.correctAnswer
        .toLowerCase()
        .trim();

      // Проверяем точное совпадение или частичное (для числовых ответов)
      const isCorrect =
        userAnswerNormalized === correctAnswerNormalized ||
        (correctAnswerNormalized === "семь" && userAnswerNormalized === "7") ||
        (correctAnswerNormalized === "xv" && userAnswerNormalized === "15") ||
        (correctAnswerNormalized === "1917" &&
          userAnswerNormalized === "1917 год");

      const earnedPoints = isCorrect ? points : 0;

      setGameAnswer({
        correct: isCorrect,
        points: earnedPoints,
      });
      setShowAnswer(true);
      onAnswer(earnedPoints);
      setIsLoading(false);
    }, 500);
  };

  const handleClose = () => {
    setIsFlipped(false);
    setUserAnswer("");
    setShowAnswer(false);
    setCurrentQuestion(null);
    setGameAnswer(null);
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
