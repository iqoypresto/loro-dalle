import axios from "axios";
import { BASE_URL } from "../constant";
import Cookies from "js-cookie";

const login = (email, password) => {
  return axios
    .post(`${BASE_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      Cookies.set("user", JSON.stringify(response.data.data), { expires: 1 });

      return response.data.data;
    });
};

const logout = () => {
  Cookies.remove("user");
};

const authHeader = () => {
  const userCookie = Cookies.get("user");
  let accessToken;

  try {
    accessToken = JSON.parse(userCookie).accessToken;
  } catch (e) {
    accessToken = null;
  }

  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    return null;
  }
};

export default {
  login,
  logout,
  authHeader,
};
