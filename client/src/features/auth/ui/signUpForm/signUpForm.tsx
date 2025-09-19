import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpThunk, UserValidator, type ISignUpData } from "@/entities";
import { CLIENT_ROUTES, useAppDispatch, useAppSelector } from "@/shared";
import styles from "./signUpForm.module.css";

const INITIAL_INPUTS_DATA: ISignUpData = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export function SignUpForm() {
  const [inputs, setInputs] = useState<ISignUpData>(INITIAL_INPUTS_DATA);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: ISignUpData) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignUpData(inputs);

    if (!isValid) {
      alert(validationError);
      return;
    }

    try {
      await dispatch(signUpThunk(inputs)).unwrap();
      setInputs(INITIAL_INPUTS_DATA);
      navigate(CLIENT_ROUTES.HOME);
    } catch {
      // Error is handled by the slice
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.form}>
      <input
        type="text"
        name="username"
        placeholder="Имя пользователя"
        onChange={onChangeHandler}
        value={inputs.username}
        className={styles.input}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={onChangeHandler}
        value={inputs.email}
        className={styles.input}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangeHandler}
        value={inputs.password}
        className={styles.input}
        required
      />
      <input
        type="password"
        name="repeatPassword"
        placeholder="Повторите пароль"
        onChange={onChangeHandler}
        value={inputs.repeatPassword}
        className={styles.input}
        required
      />
      {/* {error && <div className={styles.error}>{error}</div>} */}
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Регистрация..." : "Зарегистрироваться"}
      </button>
    </form>
  );
}
