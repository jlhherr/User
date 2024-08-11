import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../contexts/AuthContext";

function UpdateSongModal({ isOpen, onClose, song, onUpdate }) {
    const { token } = useAuth("state");
    const [title, setTitle] = useState(song.title || '');
    const [songFile, setSongFile] = useState(song.song_file || '');
    const { data, isLoading, isError, doFetch } = useFetch();

    useEffect(() => {
        if (data) {
            onUpdate(data); // Assuming onUpdate is a function to handle updated song data
            onClose();
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            alert('Error al actualizar la canción.');
        }
    }, [isError]);

    const handleUpdateSong = async (event) => {
        event.preventDefault();

        if (!title || !songFile) {
            alert('Por favor complete todos los campos.');
            return;
        }

        try {
            await doFetch(
                `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song.id}/`,
                {
                    method: "PUT",
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, song_file: songFile }),
                }
            );
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Actualizar Canción</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleUpdateSong}>
                        <div className="field">
                            <label className="label">Título</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ingrese el título de la canción"
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
                                    placeholder="Ingrese la URL del archivo de la canción"
                                />
                            </div>
                        </div>
                        <button
                            className="button is-primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Actualizando..." : "Confirmar"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default UpdateSongModal;
