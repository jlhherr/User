import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MusicContext } from '../../contexts/MusicContext';
import axios from 'axios';
//import { AuthContext } from '../AuthContext';



const SongDetail = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const navigate = useNavigate();
  const { songs, updateSong, deleteSong } = useContext(MusicContext);
  
  useEffect(() => {
    const currentSong = songs.find(s => s.id === parseInt(id));
    if (currentSong) {
      setSong(currentSong);
    }
  }, [id, songs]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateSong(id, song).then(() => navigate('/'));
  };

  const handleDelete = () => {
    deleteSong(id).then(() => navigate('/'));
  };

  if (!song) return <div>Loading...</div>;


  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">Edit Song</h1>
      <form onSubmit={handleUpdate} className="max-w-md mx-auto">
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
        <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">Delete</button>
      </form>
    </div>
  );
};

export default SongDetail;



  /*useEffect(() => {
    axios.get(`https://sandbox.academiadevelopers.com/api/songs/${id}`,{
        headers: { Authorization: `Bearer ${authToken}` }  
    }).then(response => {
        setSong(response.data);
      }).catch(error => {
        console.error('There was an error fetching the song!', error);
      });
    }, [authToken, id]);

    if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">{song.title}</h1>
      <p><strong>Artist:</strong> {song.artist}</p>
      <p><strong>Album:</strong> {song.album}</p>
      <p><strong>Genre:</strong> {song.genre}</p>
      <p><strong>Year:</strong> {song.year}</p>
      <div className="flex space-x-4 mt-4">
        <Link to={`/songs/edit/${song.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</Link>
        <Link to="/songs" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</Link>
       
      </div>
    </div>
  );
};

export default SongDetail;*/
//mostrar los detalles de una canción específica:
