import React, { useState, useEffect } from 'react';
import Header from './Header';


const Favoritas = () => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const songs = await getFavoriteSongs();
        setFavoriteSongs(songs);
      } catch (error) {
        console.error('Error fetching favorite songs:', error);
      }
    };

    fetchFavoriteSongs();
  }, []);

  return (
    <div data-testid="page-favorites" className="favorites-page">
      <Header />
      <h1>Favorites</h1>
      {favoriteSongs.length > 0 ? (
        <ul className="favorites-list">
          {favoriteSongs.map((song) => (
            <li key={song.id} className="favorite-song-item">
              <span>{song.title} - {song.artist}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite songs found.</p>
      )}
    </div>
  );
};

export default Favoritas;
