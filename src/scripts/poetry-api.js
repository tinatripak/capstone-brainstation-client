import axios from "axios";
import { api_url } from "../utils/config";

export const getPoetry = async () => {
  try {
    const response = await axios.get(`${api_url}/poetry`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all poems: ", error);
  }
};

export const getPoem = async (id) => {
  try {
    const response = await axios.get(`${api_url}/poetry/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching a poem ${id}: ${error}`);
  }
};

export const postPoem = async (newPoem, token) => {
  try {
    const response = await axios.post(`${api_url}/poetry`, newPoem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding a warehouse: ${error}`);
  }
};

export const updatePoem = async (id, updatedPoem, token) => {
  try {
    const response = await axios.put(`${api_url}/poetry/${id}`, updatedPoem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating warehouse ${id}: ${error}`);
  }
};

export const deletePoem = async (id, token) => {
  try {
    await axios.delete(`${api_url}/poetry/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Error deleting a warehouse: ${error}`);
  }
};
