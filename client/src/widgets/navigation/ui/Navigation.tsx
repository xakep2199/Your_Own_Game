import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, CLIENT_ROUTES } from "@/shared";
import type { RootState } from "@/shared/lib/store";
import { signOutThunk } from "@/entities";
import styles from "./Navigation.module.css";

export function Navigation(): React.JSX.Element {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector((store: RootState) => store.user.user);

  const handleSignOut = async () => {
    dispatch(signOutThunk());
    navigate(CLIENT_ROUTES.HOME);
  };

  return (
    <nav className={styles.header}>
      <div className={styles.navLinks}>
        <NavLink
          to={CLIENT_ROUTES.HOME}
          className={({ isActive }: { isActive: boolean }) =>
            `${styles.headerLink} ${isActive ? styles.headerLinkActive : ""}`
          }
        >
          Главная
        </NavLink>
        <NavLink
          to={CLIENT_ROUTES.PROFILE}
          className={({ isActive }: { isActive: boolean }) =>
            `${styles.headerLink} ${isActive ? styles.headerLinkActive : ""}`
          }
        >
          Личный кабинет
        </NavLink>
      </div>

      {user ? (
        <div className={styles.userSection}>
          <span className={styles.userGreeting}>Привет, {user.username}!</span>
          <button onClick={handleSignOut} className={styles.signOutButton}>
            Выйти
          </button>
        </div>
      ) : (
        <NavLink
          to={CLIENT_ROUTES.AUTH}
          className={({ isActive }: { isActive: boolean }) =>
            `${styles.headerLink} ${isActive ? styles.headerLinkActive : ""}`
          }
        >
          Вход/Регистрация
        </NavLink>
      )}
    </nav>
  );
}
