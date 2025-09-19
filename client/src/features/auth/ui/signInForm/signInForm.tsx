import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type ISignInData, signInThunk, UserValidator } from "@/entities";
import { CLIENT_ROUTES, useAppDispatch, useAppSelector } from "@/shared";
import styles from "./signInForm.module.css";

const INITIAL_INPUTS_DATA: ISignInData = {
  email: "",
  password: "",
};

export function SignInForm() {
  const [inputs, setInputs] = useState<ISignInData>(INITIAL_INPUTS_DATA);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: ISignInData) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignInData(inputs);

    if (!isValid) {
      alert(validationError);
      return;
    }

    try {
      await dispatch(signInThunk(inputs)).unwrap();
      setInputs(INITIAL_INPUTS_DATA);
      navigate(CLIENT_ROUTES.HOME);
    } catch {
      // Error is handled by the slice
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.form}>
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
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Вход..." : "Войти"}
      </button>
    </form>
  );
}