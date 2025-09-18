import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>СВОЯ ИГРА</h1>
        <p className={styles.subtitle}>
          Добро пожаловать в интеллектуальную игру! Проверьте свои знания и
          соревнуйтесь с другими игроками
        </p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>🎯 Вопросы и ответы</h3>
            <p>
              Отвечайте на вопросы из различных категорий: история, наука,
              искусство, спорт и многое другое
            </p>
          </div>
          <div className={styles.feature}>
            <h3>🏆 Турниры</h3>
            <p>
              Участвуйте в турнирах и соревнуйтесь с другими игроками за звание
              чемпиона
            </p>
          </div>
          <div className={styles.feature}>
            <h3>📊 Статистика</h3>
            <p>
              Отслеживайте свой прогресс, изучайте слабые места и улучшайте свои
              знания
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
