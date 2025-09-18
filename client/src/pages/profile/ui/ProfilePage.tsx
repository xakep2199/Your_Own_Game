import { useAppSelector } from "@/shared";
import type { RootState } from "@/shared/lib/store";
import styles from "./ProfilePage.module.css";

export function ProfilePage() {
  const user = useAppSelector((store: RootState) => store.user.user);
  const userState = useAppSelector((store: RootState) => store.user);

  return (
    <div className={styles.profilePage}>
      <h1>Статистика</h1>
      <p>Имя пользователя: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <p>Статус: {userState.loading ? "Загрузка..." : "Готово"}</p>
      {userState.error && <p>Ошибка: {userState.error}</p>}
    </div>
  );
}
