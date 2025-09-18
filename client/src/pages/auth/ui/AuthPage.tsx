import { SignUpForm, SignInForm } from "@/features";
import { useState } from "react";
import styles from "./AuthPage.module.css";

export function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.authTabs}>
          <button
            className={`${styles.authTab} ${isSignUp ? styles.active : ""}`}
            onClick={() => setIsSignUp(true)}
          >
            Регистрация
          </button>
          <button
            className={`${styles.authTab} ${!isSignUp ? styles.active : ""}`}
            onClick={() => setIsSignUp(false)}
          >
            Вход
          </button>
        </div>

        <div className={styles.authContent}>
          {isSignUp ? <SignUpForm /> : <SignInForm />}
        </div>
      </div>
    </div>
  );
}
