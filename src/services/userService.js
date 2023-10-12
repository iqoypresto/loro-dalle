import axios from "axios";
import { BASE_URL } from "../constant";
import Cookies from "js-cookie";
import authService from "./authService";

const editProfile = ({ fullname, email, phone_number, address }) => {
  const authHeader = authService.authHeader();

  return axios({
    method: "PUT",
    url: `${BASE_URL}/users/profile`,
    headers: {
      ...authHeader,
    },
    withCredentials: true,
    data: {
      fullname,
      email,
      phone_number,
      address,
    },
  }).then(() => {
    const { accessToken, isAuthenticated, isAdmin } = JSON.parse(Cookies.get("user"));

    const data = {
      accessToken,
      isAuthenticated,
      isAdmin,
      fullname,
      email,
      phone_number,
      address,
    };

    Cookies.set("user", JSON.stringify(data), { expires: 1 });

    return data;
  });
};

export default {
  editProfile,
};
