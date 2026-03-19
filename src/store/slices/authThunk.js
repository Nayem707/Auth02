import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/authAPI";
import { setAuthToken, removeAuthToken } from "../../utils/auth";

// Async thunks for authentication actions
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login({ email, password });
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      removeAuthToken();
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.register({ username, email, password });
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.refreshToken();
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      removeAuthToken();
      return rejectWithValue(
        error.response?.data?.message || "Token refresh failed",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      removeAuthToken();
      return {};
    } catch (error) {
      removeAuthToken();
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

export const socialLogin = createAsyncThunk(
  "auth/socialLogin",
  async ({ provider, token }, { rejectWithValue }) => {
    try {
      const response = await authAPI.socialLogin({ provider, token });
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Social login failed",
      );
    }
  },
);

export const firebaseLogin = createAsyncThunk(
  "auth/firebaseLogin",
  async ({ idToken, provider, user }, { rejectWithValue }) => {
    try {
      const response = await authAPI.firebaseLogin({ idToken, provider });
      setAuthToken(response.data.token);
      return { ...response.data, user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Firebase login failed",
      );
    }
  },
);
