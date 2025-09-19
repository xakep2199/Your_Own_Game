import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "@/shared";
import styles from "./Footer.module.css";

export function Footer(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <h3 className={styles.footerTitle}>СВОЯ ИГРА</h3>
          <p className={styles.footerDescription}>
            Интеллектуальная игра для проверки знаний и соревнований
          </p>
        </div>

        <div className={styles.footerLinks}>
          <button
            onClick={() => navigate(CLIENT_ROUTES.HOME)}
            className={styles.footerLink}
          >
            Главная
          </button>
          <button
            onClick={() => navigate(CLIENT_ROUTES.PROFILE)}
            className={styles.footerLink}
          >
            Личный кабинет
          </button>
        </div>
      </div>

      <div className={styles.footerCopyright}>
        © 2025 Своя Игра. Все права защищены.
      </div>
    </footer>
  );
}
