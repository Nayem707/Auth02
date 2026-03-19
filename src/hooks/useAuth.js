import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
  fetchProfile,
  socialLogin,
  firebaseLogin,
} from "../store/slices/authThunk";
import { clearError } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );

  const login = useCallback(
    (credentials) => {
      return dispatch(loginUser(credentials));
    },
    [dispatch],
  );

  const register = useCallback(
    (userData) => {
      return dispatch(registerUser(userData));
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    return dispatch(logoutUser());
  }, [dispatch]);

  const refresh = useCallback(() => {
    return dispatch(refreshToken());
  }, [dispatch]);

  const getProfile = useCallback(() => {
    return dispatch(fetchProfile());
  }, [dispatch]);

  const socialAuth = useCallback(
    (provider, token) => {
      return dispatch(socialLogin({ provider, token }));
    },
    [dispatch],
  );

  const firebaseAuth = useCallback(
    (idToken, provider, user) => {
      return dispatch(firebaseLogin({ idToken, provider, user }));
    },
    [dispatch],
  );

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    refresh,
    getProfile,
    socialAuth,
    firebaseAuth,
    clearAuthError,
  };
};
