import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/shared";
import { getAllStatisticsByUserIdThunk, getAllThemesThunk } from "@/entities";
import styles from "./ProfilePage.module.css";

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);
  const userState = useAppSelector((store) => store.user);
  const { statistics, isLoading, error } = useAppSelector(
    (store) => store.statistics
  );
  const { themes } = useAppSelector((store) => store.theme);

  useEffect(() => {
    if (user) {
      dispatch(getAllStatisticsByUserIdThunk());
      dispatch(getAllThemesThunk());
    }
  }, [user, dispatch]);

  const totalScore = statistics.reduce((sum, stat) => sum + stat.score, 0);
  const gamesPlayed = statistics.length;

  const getThemeName = (themeId: number) => {
    const theme = themes.find((t) => t.id === themeId);
    return theme ? theme.name : `Тема #${themeId}`;
  };

  return (
    <div className={styles.profilePage}>
      <h1>Личный кабинет</h1>

      <div className={styles.userInfo}>
        <h2>Информация о пользователе</h2>
        <p>Имя пользователя: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <p>Статус: {userState.loading ? "Загрузка..." : "Готово"}</p>
        {userState.error && <p>Ошибка: {userState.error}</p>}
      </div>

      <div className={styles.statistics}>
        <h2>Статистика игр</h2>

        {isLoading ? (
          <p>Загрузка статистики...</p>
        ) : error ? (
          <p>Ошибка: {error}</p>
        ) : (
          <>
            <div className={styles.summary}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Всего игр:</span>
                <span className={styles.summaryValue}>{gamesPlayed}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Общий счет:</span>
                <span className={styles.summaryValue}>{totalScore}</span>
              </div>
            </div>

            {statistics.length > 0 ? (
              <div className={styles.gamesList}>
                <h3>История игр</h3>
                <div className={styles.gamesGrid}>
                  {statistics.map((game) => (
                    <div key={game.id} className={styles.gameCard}>
                      <div className={styles.gameInfo}>
                        <h4 className={styles.gameTheme}>
                          {getThemeName(game.themeId)}
                        </h4>
                        <p className={styles.gameScore}>Счет: {game.score}</p>
                        <p className={styles.gameDate}>
                          {new Date(game.createdAt).toLocaleDateString(
                            "ru-RU",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Вы еще не играли ни в одну игру</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
