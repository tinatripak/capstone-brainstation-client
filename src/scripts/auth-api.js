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
    return data;
  } catch (error) {
    console.error("Error fetching a token: ", error);
  }
};

export const getUserById = async (id) => {
  try {
    const { data } = await axios.get(`${api_url}/auth/user/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching a token: ", error);
  }
};

export const getUsers = async (token) => {
  try {
    const { data } = await axios.get(`${api_url}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching a token: ", error);
  }
};

export const editUserById = async (id, updatedUser, token) => {
  try {
    const { data } = await axios.put(
      `${api_url}/auth/user/${id}`,
      updatedUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching a token: ", error);
  }
};

export const deleteUserById = async (id, token) => {
  try {
    const { data } = await axios.delete(`${api_url}/auth/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching a token: ", error);
  }
};

export const editAdminById = async (id, role, token) => {
  try {
    const { data } = await axios.put(
      `${api_url}/auth/admin/${id}`,
      { role: role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching a token: ", error);
  }
};

export const deleteAdminById = async (id, token) => {
  try {
    const { data } = await axios.delete(`${api_url}/auth/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching a token: ", error);
  }
};
