import { useAppSelector, type RootState } from "@/shared";
import styles from "./ProfilePage.module.css";


export function ProfilePage() {
    const user = useAppSelector((store: RootState) => store.auth.user);
    const statistics = useAppSelector((store: RootState) => store.statistics);


    return (
        <div className={styles.profilePage}>
            <h1>Статистика</h1>
            <p>Имя пользователя: {user?.username}</p>
            <p>Email: {user?.email}</p>
            <p>Статистика: {statistics}</p>
        </div>
    )
}