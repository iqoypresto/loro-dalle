// src/reducers/authReducer.js

import Cookies from "js-cookie";
import { EDIT_PROFILE_SUCCESS } from "../actions/type";

const userCookie = Cookies.get("user");
let user;
try {
  user = JSON.parse(userCookie);
} catch (e) {
  user = null;
}
const isAdmin = user ? user.isAdmin : false;

const initialState = isAdmin
  ? {
      isAuthenticated: true,
      isAdmin: true,
      user,
    }
  : user
  ? {
      isAuthenticated: true,
      isAdmin: false,
      user,
    }
  : {
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: payload.user.isAdmin,
        user: payload.user,
      };
    default:
      return state;
  }
}
