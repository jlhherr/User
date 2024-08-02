// src/MusicContext.js
import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';
import  AuthContext from '../contexts/AuthContext';

export const MusicContext = createContext();

 export const MusicProvider = ({ children }) => {
  const { authToken } = useContext(AuthContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (authToken) {
      axios.get('https://sandbox.academiadevelopers.com/harmonyhub/songs/', {
        headers: { Authorization: `Bearer ${authToken}` }
      }).then(response => {
        setSongs(response.data);
      }).catch(error => {
        console.error("Error fetching songs:", error);
      });
    }
  }, [authToken]);



  

  const addSong = (song) => {
    return axios.post('https://sandbox.academiadevelopers.com/songs', song, {
      headers: { Authorization: `Bearer ${authToken}` }
    }).then(response => {
      setSongs([...songs, response.data]);
    });
  };

  const updateSong = (id, song) => {
    return axios.put(`https://sandbox.academiadevelopers.com/songs/${id}`, song, {
      headers: { Authorization: `Bearer ${authToken}` }
    }).then(response => {
      setSongs(songs.map(s => (s.id === id ? response.data : s)));
    });
  };

  const deleteSong = (id) => {
    return axios.delete(`https://sandbox.academiadevelopers.com/songs/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    }).then(() => {
      setSongs(songs.filter(s => s.id !== id));
    });
  };

  return (
    <MusicContext.Provider value={{ songs, addSong, updateSong, deleteSong }}>
      {children}
    </MusicContext.Provider>
  );
};



