import React, { useState } from 'react';
import { fetchSongs } from '../services/api'; // Asegúrate de que esta función esté definida correctamente

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log('Searching for:', query);
            const response = await fetchSongs(query);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            setResults(data.results || []);  // Asume que `results` es la clave correcta
        } catch (error) {
            console.error("Error al buscar canciones:", error);
            setError("No se pudieron buscar las canciones. Por favor, inténtelo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for songs, playlists, or artists"
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
            <div>
                {error && <p className="has-text-centered has-text-danger">{error}</p>}
                {results.length > 0 ? (
                    results.map((result) => (
                        <div key={result.id}>
                            {result.title}
                            <button onClick={() => console.log('Downloading', result.title)}>Download</button>
                        </div>
                    ))
                ) : (
                    !loading && <p className="has-text-centered">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
