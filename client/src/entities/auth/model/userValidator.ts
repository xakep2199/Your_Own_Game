import type { SignInData, SignUpData } from "./authSlice";

export class UserValidator {
  static validateSignInData(data: SignInData): {
    isValid: boolean;
    error?: string;
  } {
    if (!data.email || !data.password) {
      return { isValid: false, error: "Все поля обязательны для заполнения" };
    }

    if (!this.isValidEmail(data.email)) {
      return { isValid: false, error: "Некорректный email" };
    }

    if (data.password.length < 6) {
      return {
        isValid: false,
        error: "Пароль должен содержать минимум 6 символов",
      };
    }

    return { isValid: true };
  }

  static validateSignUpData(data: SignUpData): {
    isValid: boolean;
    error?: string;
  } {
    if (
      !data.username ||
      !data.email ||
      !data.password ||
      !data.repeatPassword
    ) {
      return { isValid: false, error: "Все поля обязательны для заполнения" };
    }

    if (data.username.length < 3) {
      return {
        isValid: false,
        error: "Имя пользователя должно содержать минимум 3 символа",
      };
    }

    if (!this.isValidEmail(data.email)) {
      return { isValid: false, error: "Некорректный email" };
    }

    if (data.password.length < 6) {
      return {
        isValid: false,
        error: "Пароль должен содержать минимум 6 символов",
      };
    }

    if (data.password !== data.repeatPassword) {
      return { isValid: false, error: "Пароли не совпадают" };
    }

    return { isValid: true };
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
