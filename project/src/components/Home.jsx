import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import FooterBar from './FooterBar';
import { useAuth } from '../contexts/AuthContext';

function Home() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth("actions"); // Obtén el estado de autenticación
    const navigate = useNavigate(); // Hook para redireccionar programáticamente

    useEffect(() => {
        if (!isAuthenticated) {
            // Redirige al usuario al login si no está autenticado
            navigate('/login');
            return;
        }

        async function fetchSongs() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs`);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Network response was not ok: ${errorText}`);
                }
                
                const data = await response.json();
                setSongs(data.songs || []);
            } catch (error) {
                console.error("Error al obtener canciones:", error);
                setError(error.message);
                setSongs([]);
            } finally {
                setLoading(false);
            }
        }

        fetchSongs();
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="section">
                <div className="container">
                    <h1 className="title has-text-centered">Bienvenido a la Aplicación de Música</h1>

                    {isAuthenticated ? (
                        <>
                            {loading && <p className="has-text-centered">Cargando canciones...</p>}
                            {error && <p className="has-text-centered has-text-danger">Error: {error}</p>}
                            {songs.length > 0 ? (
                                <div className="content">
                                    <h2 className="title is-4">Lista de Canciones</h2>
                                    <ul>
                                        {songs.map((song) => (
                                            <li key={song.id} className="mb-2">
                                                <span className="has-text-weight-bold">{song.title}</span> - {song.artist}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                !loading && !error && <p className="has-text-centered">No hay canciones disponibles.</p>
                            )}
                        </>
                    ) : (
                        <Link to="/login">
                            <button className="button is-primary is-large is-fullwidth mb-4">
                                Acceso al Login
                            </button>
                        </Link>
                    )}
                </div>
            </main>
            <FooterBar
                socialNetworks={[
                    { name: 'facebook', url: 'https://facebook.com' },
                    { name: 'twitter', url: 'https://twitter.com' },
                    { name: 'instagram', url: 'https://instagram.com' }
                ]}
                appName="HarmonyHub Aplicación de Música"
            />
        </div>
    );
}

export default Home;
