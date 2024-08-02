// src/components/MusicPlayer/SongEdit.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSongs, updateSong } from '../../services/api';

const SongEdit = () => {
  const { id } = useParams();
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await getSongs();
        const song = data.find((s) => s.id === id);
        setSongData(song);
      } catch (error) {
        console.error('Error fetching song:', error);
      }
    };

    fetchSong();
  }, [id]);

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
      await updateSong(id, songData);
      // Manejo después de la actualización exitosa
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  if (!songData) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Song</h1>
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
          Update Song
        </button>
      </form>
    </div>
  );
};

export default SongEdit;
