import userService from "../services/userService";
import { EDIT_PROFILE_SUCCESS } from "./type";

export const editProfile = (user) => (dispatch) => {
  return userService.editProfile(user).then(
    (data) => {
      dispatch({
        type: EDIT_PROFILE_SUCCESS,
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