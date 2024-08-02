import { useEffect, useState, useContext, AuthContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}/`, {
      headers: { Authorization: `Bearer ${authToken}` }
    }).then(response => {
      setAlbum(response.data);
    });
  }, [id, authToken]);

  const deleteAlbum = () => {
    axios.delete(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}/`, {
      headers: { Authorization: `Bearer ${authToken}` }
    }).then(() => {
      navigate('/albums');
    });
  };

  if (!album) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">{album.title}</h1>
      <p>{album.description}</p>
      <button onClick={deleteAlbum} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Delete Album</button>
    </div>
  );
};

export default AlbumDetail;
