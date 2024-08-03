import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

const Album = () => {
  const [musics, setMusics] = useState([]);
  const [info, setInfo] = useState({});
  const [songList, setSongList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const musicsList = await getMusics(id);
        const albumInfo = musicsList[0];
        setMusics(musicsList.slice(1));
        setInfo(albumInfo);
        
        const favoritesSongs = await getFavoriteSongs();
        setSongList(favoritesSongs);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [id]);

  const { artistName, collectionName } = info;

  return (
    <div data-testid="page-album" className="music-page">
      <Header />
      <div className="music-list">
        <h2>Artist:</h2>
        <h3 data-testid="artist-name">{artistName || 'Loading...'}</h3>
        <h2>Album:</h2>
        <h3 data-testid="album-name">{collectionName || 'Loading...'}</h3>
        <MusicCard list={musics} songList={songList} />
      </div>
    </div>
  );
};

Album.propTypes = {
  id: PropTypes.string,
};

Album.defaultProps = {
  id: '',
};

export default Album;
