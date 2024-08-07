import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

function DeleteSongModal({ isOpen, onClose, song_id, onDelete }) {
    const { token } = useAuth("state");
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteSong = async (event) => {
        event.preventDefault();
        setIsDeleting(true);
        setError(null);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song_id}/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to delete song: ${response.statusText}`);
            }

            onDelete(); // Call the callback to refresh the list or update state
            onClose();  // Close the modal after deletion
        } catch (err) {
            console.error("Error deleting song:", err);
            setError("No se pudo eliminar la canción. Inténtalo de nuevo más tarde.");
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        // Handle any additional side-effects when deletion is complete
        if (!isOpen && !isDeleting && !error) {
            onClose();
        }
    }, [isOpen, isDeleting, error, onClose]);

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Eliminar Canción</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <p className="subtitle">
                        ¿Estás seguro de que deseas eliminar esta canción? No se podrá recuperar este recurso.
                    </p>
                    {error && <p className="has-text-danger">{error}</p>}
                </section>
                <footer className="modal-card-foot">
                    <button
                        className="button is-danger"
                        onClick={handleDeleteSong}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Eliminando..." : "Confirmar"}
                    </button>
                    <button className="button" onClick={onClose}>
                        Cancelar
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default DeleteSongModal;