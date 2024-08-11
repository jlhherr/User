import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import DeleteSongModal from "./DeleteSongModal";
import UpdateSongModal from "./UpdateSongModal";
import AddSongModal from "./AddSongModal";

function SongCard({ song, user_ID }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [updatedSong, setUpdatedSong] = useState(null);
    const { data, isLoading, isError, doFetch } = useFetch();

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const handleUpdateClick = () => {
        setUpdatedSong(song);
    };

    const handleAddSong = async (newSong) => {
        try {
            await doFetch(
                `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newSong),
                }
            );
            setIsAddModalOpen(false); // Close the modal on successful addition
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    const handleUpdateSong = async (updatedSongData) => {
        try {
            await doFetch(
                `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${updatedSong.id}/`,
                {
                    method: "PUT",
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedSongData),
                }
            );
            setUpdatedSong(null); // Clear the updated song data and close the modal
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };

    return (
        <div className={`card violet-background columns my-1 mx-2`}>
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
            {song.owner === user_ID && (
                <div className="column">
                    <button className="button is-danger" onClick={handleDeleteClick}>
                        Eliminar
                    </button>
                    <button className="button is-primary" onClick={handleUpdateClick}>
                        Actualizar
                    </button>
                </div>
            )}
            <button className="button is-primary my-1 mx-1" onClick={handleAddClick}>
                Agregar
            </button>
            {isDeleteModalOpen && (
                <DeleteSongModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    song_id={song.id}
                    onDelete={{ data, isLoading, isError, doFetch }}
                />
            )}
            {isAddModalOpen && (
                <AddSongModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddSong}
                />
            )}
            {updatedSong && (
                <UpdateSongModal
                    isOpen={!!updatedSong}
                    onClose={() => setUpdatedSong(null)}
                    song={updatedSong}
                    onUpdate={handleUpdateSong}
                />
            )}
        </div>
    );
}

export default SongCard;
