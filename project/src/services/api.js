// src/services/api.js
/*import axios from 'axios';

const API_URL = 'https://sandbox.academiadevelopers.com/harmonyhub/song/';

export const authenticate = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api-auth/`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};

export const getAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL}/albums`);
    return response.data;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const getSongs = async () => {
  try {
    const response = await axios.get(`${API_URL}/songs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

export const createSong = async (songData) => {
  try {
    const response = await axios.post(`${API_URL}/songs`, songData);
    return response.data;
  } catch (error) {
    console.error('Error creating song:', error);
    throw error;
  }
};

export const updateSong = async (id, songData) => {
  try {
    const response = await axios.put(`${API_URL}/songs/${id}`, songData);
    return response.data;
  } catch (error) {
    console.error('Error updating song:', error);
    throw error;
  }
};

export const deleteSong = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/songs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting song:', error);
    throw error;
  }
};
*/

// src/services/api.js
import axios from 'axios';

const API_URL = 'https://sandbox.academiadevelopers.com/api-auth/';

export const authenticate = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/authenticate`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};

export const getAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL}/albums`);
    return response.data;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const getSongs = async () => {
  try {
    const response = await axios.get(`${API_URL}/songs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

export const createSong = async (songData) => {
  try {
    const response = await axios.post(`${API_URL}/songs`, songData);
    return response.data;
  } catch (error) {
    console.error('Error creating song:', error);
    throw error;
  }
};

export const updateSong = async (id, songData) => {
  try {
    const response = await axios.put(`${API_URL}/songs/${id}`, songData);
    return response.data;
  } catch (error) {
    console.error('Error updating song:', error);
    throw error;
  }
};

export const deleteSong = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/songs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting song:', error);
    throw error;
  }
};
