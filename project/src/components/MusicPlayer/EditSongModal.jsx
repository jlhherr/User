import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

function EditSongModal({ isOpen, onClose, song_id, songDetails, onUpdate }) {
    const [title, setTitle] = useState('');
    const [songFile, setSongFile] = useState('');
    const { doFetch, isLoading, isError } = useFetch();

    useEffect(() => {
        if (songDetails) {
            setTitle(songDetails.title || '');
            setSongFile(songDetails.song_file || '');
        }
    }, [songDetails]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !songFile) {
            alert('Por favor, complete todos los campos.');
            return;
        }

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
            onUpdate(); // Callback songlist
            onClose(); // Close modal  update
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Editar Canción</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
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
                </section>
            </div>
        </div>
    );
}

export default EditSongModal;
