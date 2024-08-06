import React, { useEffect, useState, useRef } from "react";
import SongCard from "./SongCard";

function SongList() {
    const [page, setPage] = useState(1);
    const [songs, setSongs] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [newSong, setNewSong] = useState({ title: "", artist: "", created_at: "" });

    const observerRef = useRef();
    const lastSongElementRef = useRef();

    const doFetch = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: 5,
            ordering: `-created_at`,
            ...filters,
        }).toString();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?${query}`);
            const data = await response.json();
            if (data.results) {
                setSongs((prevSongs) => [...prevSongs, ...data.results]);
                setNextUrl(data.next);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        doFetch();
    }, [page, filters]);

    useEffect(() => {
        if (isLoading) return;
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((cards) => {
            if (cards[0].isIntersecting && nextUrl) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (lastSongElementRef.current) {
            observerRef.current.observe(lastSongElementRef.current);
        }
    }, [isLoading, nextUrl]);

    function handleSearch(event) {
        event.preventDefault();
        const searchForm = new FormData(event.target);
        const newFilters = {};
        searchForm.forEach((value, key) => {
            if (value) {
                newFilters[key] = value;
            }
        });
        setFilters(newFilters);
        setSongs([]);
        setPage(1);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewSong((prevSong) => ({ ...prevSong, [name]: value }));
    };

    const handleCreate = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSong),
            });
            const data = await response.json();
            setSongs([data, ...songs]);
            setNewSong({ title: "", artist: "", created_at: "" });
        } catch (error) {
            setIsError(true);
        }
    };

    const handleEdit = async (song) => {
        setEditMode(true);
        setCurrentSong(song);
        setNewSong({ title: song.title, artist: song.artist, created_at: song.created_at });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${currentSong.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSong),
            });
            const data = await response.json();
            setSongs((prevSongs) => prevSongs.map((song) => (song.id === data.id ? data : song)));
            setEditMode(false);
            setCurrentSong(null);
            setNewSong({ title: "", artist: "", created_at: "" });
        } catch (error) {
            setIsError(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${id}/`, {
                method: 'DELETE',
            });
            setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
        } catch (error) {
            setIsError(true);
        }
    };

    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!songs.length && !isLoading) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Canciones</h2>
                <form className="box" onSubmit={handleSearch}>
                    {/* Existing search form */}
                </form>
                <div className="box">
                    <h3 className="title">Agregar Canción</h3>
                    <input
                        className="input"
                        type="text"
                        name="title"
                        value={newSong.title}
                        onChange={handleInputChange}
                        placeholder="Título"
                    />
                    <input
                        className="input"
                        type="text"
                        name="artist"
                        value={newSong.artist}
                        onChange={handleInputChange}
                        placeholder="Artista"
                    />
                    <input
                        className="input"
                        type="datetime-local"
                        name="created_at"
                        value={newSong.created_at}
                        onChange={handleInputChange}
                    />
                    {editMode ? (
                        <button className="button is-primary" onClick={handleUpdate}>
                            Actualizar Canción
                        </button>
                    ) : (
                        <button className="button is-primary" onClick={handleCreate}>
                            Agregar Canción
                        </button>
                    )}
                </div>
                <ul>
                    {songs.map((song, index) => (
                        <div
                            key={song.id}
                            ref={songs.length === index + 1 ? lastSongElementRef : null}
                            className="column is-two-thirds"
                        >
                            <SongCard song={song} onEdit={() => handleEdit(song)} onDelete={() => handleDelete(song.id)} />
                        </div>
                    ))}
                </ul>
                {isLoading && <p>Cargando más canciones...</p>}
            </div>
        </div>
    );
}

export default SongList;
