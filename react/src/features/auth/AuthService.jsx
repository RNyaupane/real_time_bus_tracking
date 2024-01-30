import axios from "axios";
import { base_url } from "../../data/base_url";
const getAceessToken = localStorage.getItem("ACCESS_TOKEN")
  ? JSON.parse(localStorage.getItem("ACCESS_TOKEN"))
  : "";

const config = {
  headers: {
    Authorization: `Bearer ${getAceessToken}`,
    Accept: "application/json",
  },
};
const login = async (userData) => {
  const response = await axios.post(`${base_url}/users/login/`, userData);
  if (response.data) {
    localStorage.setItem(
      "ACCESS_TOKEN",
      JSON.stringify(response.data.access_token)
    );
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("user_data");
};

const register = async (userData) => {
  const response = await axios.post(`${base_url}/users/register/`, userData);
  return response.data;
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
