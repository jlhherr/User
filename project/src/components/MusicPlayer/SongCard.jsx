import useFetch from "../../hooks/useFetch";
import SongDelete from "./SongDelete";
import { useState } from "react";

function SongCard({ song, user_ID, onDelete }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLoading, isError, doFetch } = useFetch();

    // Función para manejar la eliminación de la canción
    const handleDelete = async () => {
        try {
            await doFetch({
                url: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${song.id}/`,
                method: 'DELETE',
            });
            onDelete(song.id); // Notificar a SongList para actualizar la lista
        } catch (error) {
            console.error("Error al eliminar la canción:", error);
        }
    };

    return (
        <div className={`card has-background-dark columns my-1 mx-2`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {song.title}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <audio controls>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
            {song.owner === user_ID ? (
                <div className="column" onClick={() => setIsModalOpen(true)}>
                    <button className="button is-danger">Eliminar</button>
                </div>
            ) : null}
            {isModalOpen && (
                <SongDelete
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onDelete={handleDelete} // Pasar la función handleDelete
                />
            )}
        </div>
    );
}

export default SongCard;
