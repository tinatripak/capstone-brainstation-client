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

export const getPoemsByAuthor = async (id) => {
  try {
    const response = await axios.get(`${api_url}/poetry/author/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching poems by authorId ${id}: ${error}`);
  }
};

export const getFavPoems = async (id) => {
  try {
    const response = await axios.get(`${api_url}/poetry/${id}/fav-poems`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching fav poems by userId ${id}: ${error}`);
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
    console.error(`Error adding a poem: ${error}`);
  }
};

export const updatePoem = async (id, updatedPoem, token) => {
  try {
    console.log(id, updatedPoem, token);
    const response = await axios.put(`${api_url}/poetry/${id}`, updatedPoem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating a poem by ${id}: ${error}`);
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
    console.error(`Error deleting a poem: ${error}`);
  }
};

export const likeOrUnlikePoem = async (id, token) => {
  try {
    const response = await axios.put(
      `${api_url}/poetry/${id}/like`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating a poem by ${id}: ${error}`);
  }
};
