import React, { useState } from 'react';
import { createAlbum } from '../api';

const AlbumsForm = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [artist, setArtist] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const albumData = { title, year: parseInt(year), artist: parseInt(artist) };
      await createAlbum(albumData);
      alert('Album created successfully!');
    } catch (error) {
      alert('Error creating album:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist ID</label>
        <input
          type="number"
          id="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Create Album
      </button>
    </form>
  );
};

export default AlbumsForm;
