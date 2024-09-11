import axios from "axios";
import { api_url } from "../utils/config";

export const login = async (user) => {
  try {
    const response = await axios.post(`${api_url}/auth/login`, user);
    return response;
  } catch (error) {
    console.error("Error fetching all poems: ", error);
  }
};

export const register = async (user) => {
  try {
    const response = await axios.post(`${api_url}/auth/register`, user);
    return response;
  } catch (error) {
    console.error("Error fetching all poems: ", error);
  }
};

export const checkToken = async (token) => {
  try {
    const response = await axios.get(`${api_url}/auth/register`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching all poems: ", error);
  }
};
