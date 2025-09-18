export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData extends ISignInData {
  username: string;
  repeatPassword: string;
}

export interface IUser extends ISignUpData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UserResponseType = {
  user: IUser;
  accessToken: string;
};

export const USER_API_ROUTES = {
  REFRESH_TOKENS: "/auth/refreshTokens",
  SIGN_UP: "/auth/signUp",
  SIGN_IN: "/auth/signIn",
  SIGN_OUT: "/auth/signOut",
} as const;
