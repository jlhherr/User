import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../MusicContext';

const AddSong = () => {
  const { addSong } = useContext(MusicContext);
  const navigate = useNavigate();
  const [song, setSong] = useState({ title: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addSong(song).then(() => navigate('/'));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">Add New Song</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={song.title}
            onChange={(e) => setSong({ ...song, title: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Song</button>
      </form>
    </div>
  );
};

export default AddSong;
