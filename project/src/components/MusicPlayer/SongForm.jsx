// src/components/MusicPlayer/SongForm.jsx
import React, { useState } from 'react';
import { createSong } from '../../services/api';

const SongForm = () => {
  const [songData, setSongData] = useState({
    title: '',
    artist: '',
    album: '',
    // Otros campos según sea necesario
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSongData({
      ...songData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSong(songData);
      // Manejo después de la creación exitosa
    } catch (error) {
      console.error('Error creating song:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Song</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={songData.title}
          onChange={handleInputChange}
          placeholder="Song Title"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="artist"
          value={songData.artist}
          onChange={handleInputChange}
          placeholder="Artist"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="album"
          value={songData.album}
          onChange={handleInputChange}
          placeholder="Album"
          className="border p-2 mb-2 w-full"
        />
        {/* Otros campos según sea necesario */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Create Song
        </button>
      </form>
    </div>
  );
};

export default SongForm;
