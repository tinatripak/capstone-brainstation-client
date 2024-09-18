import axios from "axios";
import { api_url } from "../utils/config";

export const login = async (user) => {
  try {
    const response = await axios.post(`${api_url}/auth/login`, user, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching a login: ", error);
  }
};

export const register = async (user) => {
  try {
    const response = await axios.post(`${api_url}/auth/register`, user, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching a register: ", error);
  }
};

export const checkToken = async (token) => {
  try {
    const { data } = await axios.get(`${api_url}/auth/checkToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return data.success;
  } catch (error) {
    console.error("Error fetching a token: ", error);
  }
};
