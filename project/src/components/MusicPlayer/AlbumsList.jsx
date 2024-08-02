import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

function AlbumList() {
    const [{ data: albums, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/albums/"
    );
    const [newAlbum, setNewAlbum] = useState({ title: "", artist: "" });
    const [editAlbum, setEditAlbum] = useState(null);

    useEffect(() => {
        doFetch(); // Fetch albums on component mount
    }, [doFetch]);

    const handleCreate = async () => {
        await doFetch({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAlbum),
        });
        setNewAlbum({ title: "", artist: "" });
        doFetch(); // Refresh the album list
    };

    const handleUpdate = async () => {
        if (!editAlbum) return;
        await doFetch({
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editAlbum),
        });
        setEditAlbum(null);
        doFetch(); // Refresh the album list
    };

    const handleDelete = async (id) => {
        await doFetch({
            method: "DELETE",
        });
        doFetch(); // Refresh the album list
    };

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los álbumes.</p>;
    if (!albums || albums.length === 0) return <p>No hay álbumes disponibles.</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Álbumes</h2>
                <ul>
                    {albums.map((album) => (
                        <div key={album.id} className="column is-two-third">
                            <h3>{album.title}</h3>
                            <p>{album.artist}</p>
                            <button onClick={() => handleDelete(album.id)} className="button is-danger">
                                Eliminar
                            </button>
                            <button onClick={() => setEditAlbum(album)} className="button is-warning">
                                Editar
                            </button>
                        </div>
                    ))}
                </ul>
                <div>
                    <h3 className="title">Agregar Nuevo Álbum</h3>
                    <input
                        type="text"
                        placeholder="Título"
                        value={newAlbum.title}
                        onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Artista"
                        value={newAlbum.artist}
                        onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
                    />
                    <button onClick={handleCreate} className="button is-primary">
                        Agregar
                    </button>
                </div>
                {editAlbum && (
                    <div>
                        <h3 className="title">Editar Álbum</h3>
                        <input
                            type="text"
                            placeholder="Título"
                            value={editAlbum.title}
                            onChange={(e) => setEditAlbum({ ...editAlbum, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Artista"
                            value={editAlbum.artist}
                            onChange={(e) => setEditAlbum({ ...editAlbum, artist: e.target.value })}
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

export default AlbumList;
