import axios from "axios";
import { api_url } from "../utils/config";

export const login = async (user) => {
  try {
    const response = await axios.post(`${api_url}/auth/login`, user, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching all poems: ", error);
  }
};

export const register = async (user) => {
  try {
    const response = await axios.post(`${api_url}/auth/register`, user, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching all poems: ", error);
  }
};

export const checkToken = async (token) => {
  try {
    const {
      data: { success },
    } = await axios.get(`${api_url}/auth/register`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return success;
  } catch (error) {
    console.error("Error fetching all poems: ", error);
  }
};
