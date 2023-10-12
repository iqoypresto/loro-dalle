import authService from "../services/authService";
import { LOGIN_SUCCESS, LOGOUT } from "./type";

export const login = (email, password) => (dispatch) => {
  return authService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error.response.status >= 500 && error.response.status < 600
          ? "Terjadi Kesalahan Sistem"
          : error.response.data.message;

      return Promise.reject({ status: error.response.status, message });
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();

  dispatch({
    type: LOGOUT,
  });
};
