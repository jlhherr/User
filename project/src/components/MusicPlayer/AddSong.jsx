import React, { useState } from 'react';
import useFetch from "../../hooks/useFetch";

function AddPlaylistEntry({ playlistId, userId }) {
    const [order, setOrder] = useState(1);
    const [songId, setSongId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { doFetch } = useFetch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const newEntry = {
            order: parseInt(order),
            playlist: playlistId,
            song: parseInt(songId),
        };

        try {
            const response = await doFetch({
                url: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlist_entries/`,
                method: 'POST',
                body: JSON.stringify(newEntry),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            // Assuming response contains the created entry data
            console.log('Entrada añadida:', response);
        } catch (error) {
            console.error('Error al añadir la entrada:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="box">
            <h2 className="title">Añadir Entrada a la Lista de Reproducción</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Orden:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">ID de la Canción:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            value={songId}
                            onChange={(e) => setSongId(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <button
                        className="button is-primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Añadiendo...' : 'Añadir Entrada'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddPlaylistEntry;
