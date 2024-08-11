


import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

function ArtistList() {
    const [{ data: artists, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/artists/"
    );
    const [newArtist, setNewArtist] = useState({ name: "", genre: "", birth_date: "", bio: "" });
    const [editArtist, setEditArtist] = useState(null);

    useEffect(() => {
        doFetch(); // Fetch artists on component mount
    }, [doFetch]);

    const handleCreate = async () => {
        await doFetch({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newArtist),
        });
        setNewArtist({ name: "", genre: "", birth_date: "", bio: "" });
        doFetch(); 
    };

    const handleUpdate = async () => {
        if (!editArtist) return;
        await doFetch({
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editArtist),
        });
        setEditArtist(null);
        doFetch(); // Refresh lista artista
    };

    const handleDelete = async (id) => {
        await doFetch({
            method: "DELETE",
        });
        doFetch(); // Refresh artistas
    };

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los artistas.</p>;
    if (!artists || artists.length === 0) return <p>No hay artistas disponibles.</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Artistas</h2>
                <ul>
                    {artists.map((artist) => (
                        <div key={artist.id} className="column is-two-third">
                            <h3>{artist.name}</h3>
                            <p>Género: {artist.genre}</p>
                            <p>Fecha de Nacimiento: {artist.birth_date}</p>
                            <p>Biografía: {artist.bio}</p>
                            <button onClick={() => handleDelete(artist.id)} className="button is-danger">
                                Eliminar
                            </button>
                            <button onClick={() => setEditArtist(artist)} className="button is-warning">
                                Editar
                            </button>
                        </div>
                    ))}
                </ul>
                <div>
                    <h3 className="title">Agregar Nuevo Artista</h3>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={newArtist.name}
                        onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Género"
                        value={newArtist.genre}
                        onChange={(e) => setNewArtist({ ...newArtist, genre: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Fecha de Nacimiento"
                        value={newArtist.birth_date}
                        onChange={(e) => setNewArtist({ ...newArtist, birth_date: e.target.value })}
                    />
                    <textarea
                        placeholder="Biografía"
                        value={newArtist.bio}
                        onChange={(e) => setNewArtist({ ...newArtist, bio: e.target.value })}
                    />
                    <button onClick={handleCreate} className="button is-primary">
                        Agregar
                    </button>
                </div>
                {editArtist && (
                    <div>
                        <h3 className="title">Editar Artista</h3>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={editArtist.name}
                            onChange={(e) => setEditArtist({ ...editArtist, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Género"
                            value={editArtist.genre}
                            onChange={(e) => setEditArtist({ ...editArtist, genre: e.target.value })}
                        />
                        <input
                            type="date"
                            placeholder="Fecha de Nacimiento"
                            value={editArtist.birth_date}
                            onChange={(e) => setEditArtist({ ...editArtist, birth_date: e.target.value })}
                        />
                        <textarea
                            placeholder="Biografía"
                            value={editArtist.bio}
                            onChange={(e) => setEditArtist({ ...editArtist, bio: e.target.value })}
                        />
                        <button onClick={handleUpdate} className="button is-warning">
                            Actualizar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ArtistList;
