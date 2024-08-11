import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

function AddSongModal({ isOpen, onClose, onAdd }) {
    const { token } = useAuth("state");
    const [title, setTitle] = useState('');
    const [songFile, setSongFile] = useState('');

    const handleAddSong = async (event) => {
        event.preventDefault();

        if (!title || !songFile) {
            alert('Por favor complete todos los campos.');
            return;
        }

        try {
            await onAdd.doFetch(
                `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, song_file: songFile }),
                }
            );
            onClose();
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Agregar</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleAddSong}>
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
                            disabled={onAdd.isLoading}
                        >
                            {onAdd.isLoading ? "Agregando..." : "Confirmar"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default AddSongModal;
