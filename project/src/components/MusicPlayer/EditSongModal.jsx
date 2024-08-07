import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

function EditSongModal({ isOpen, onClose, song_id, songDetails, onUpdate }) {
    const [title, setTitle] = useState(songDetails.title || '');
    const [songFile, setSongFile] = useState(songDetails.song_file || '');
    const { doFetch, isLoading, isError } = useFetch();

    useEffect(() => {
        if (songDetails) {
            setTitle(songDetails.title);
            setSongFile(songDetails.song_file);
        }
    }, [songDetails]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedSong = { title, song_file: songFile };

        try {
            await doFetch({
                url: `${import.meta.env.VITE_API_BASE_URL}/api/songs/${song_id}/`,
                method: 'PUT',
                body: JSON.stringify(updatedSong),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            onUpdate(); // Callback to refresh the song list
            onClose(); // Close modal after update
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content">
                <div className="box">
                    <h1 className="title">Editar Canción</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Título</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Archivo de Canción</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={songFile}
                                    onChange={(e) => setSongFile(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Actualizando...' : 'Actualizar'}
                                </button>
                                {isError && <p className="has-text-danger">Error al actualizar</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
    );
}

export default EditSongModal;
