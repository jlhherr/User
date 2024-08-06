import { useState, useEffect } from 'react';

export const useSongs = (apiUrl) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Network response was not ok: ${errorText}`);
                }

                const data = await response.json();
                setSongs(data.results || []);
            } catch (error) {
                console.error("Error al obtener canciones:", error);
                setError("No se pudieron cargar las canciones. Por favor, inténtelo de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [apiUrl]);

    return { songs, loading, error };
};