import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { axiosInstance } from "@/shared/lib/axiosInstance";

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const signInThunk = createAsyncThunk<
  AuthResponse,
  SignInData,
  { rejectValue: string }
>("auth/signIn", async (signInData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/signIn", signInData);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || "Ошибка при входе");
  }
});

export const signUpThunk = createAsyncThunk<
  AuthResponse,
  SignUpData,
  { rejectValue: string }
>("auth/signUp", async (signUpData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/signUp", signUpData);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Ошибка при регистрации"
    );
  }
});

export const signOutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/signOut", async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/auth/signOut");
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || "Ошибка при выходе");
  }
});

export const refreshTokensThunk = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  void,
  { rejectValue: string }
>("auth/refreshTokens", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/auth/refreshTokens");
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Ошибка при обновлении токенов"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при входе";
      })
      // Sign Up
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при регистрации";
      })
      // Sign Out
      .addCase(signOutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(signOutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при выходе";
      })
      // Refresh Tokens
      .addCase(refreshTokensThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      });
  },
});

export const { clearError, setTokens, clearAuth } = authSlice.actions;
export { authSlice };
