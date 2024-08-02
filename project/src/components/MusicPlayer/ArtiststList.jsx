/*import { useState, useEffect } from "react";
import SongCard from "./SongCard";
import AlbumsList fron "../MusicPlayer/AlbumsList"

export default function SongList() {
    const [page, setPage] = useState(1);
    const [nextURL, setNextURL] = useState(null);
    const [songs, setSongs] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const doFetch = async () => {
        setIsLoading(true);
        fetch(
            `${
                import.meta.env.VITE_API_BASE_URL
            }harmonyhub/songs/?page=${page}&page_size=5`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se puedieron cargar las canciones");
                }
                return response.json();
            })
            .then((data) => {
                if (data.results) {
                    setSongs((prevSongs) => [...prevSongs, ...data.results]);
                    setNextURL(data.next);
                }
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleLoadMore() {
        if (nextURL) {
            setPage((currentPage) => currentPage + 1);
        }
    }

    useEffect(() => {
        doFetch();
    }, [page]);

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Canciones</h2>
                <ul>
                    {songs.map((song) => (
                        <div key={song.id} className="column is-two-thirds">
                            <SongCard song={song} />
                        </div>
                    ))}
                </ul>
                {isLoading && <p>Cargando más canciones...</p>}
                {nextURL && !isLoading && (
                    <button
                        className="button is-primary"
                        onClick={handleLoadMore}
                    >
                        Cargar más
                    </button>
                )}
            </div>
        </div>
    );
}*/




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
        doFetch(); // Refresh the artist list
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
        doFetch(); // Refresh the artist list
    };

    const handleDelete = async (id) => {
        await doFetch({
            method: "DELETE",
        });
        doFetch(); // Refresh the artist list
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
