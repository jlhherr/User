import React, { useState, useEffect } from 'react';

const SongForm = ({ onCreate, onUpdate, editingSong }) => {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        created_at: '',
    });

    useEffect(() => {
        if (editingSong) {
            setFormData({
                title: editingSong.title,
                artist: editingSong.artist,
                created_at: editingSong.created_at,
            });
        } else {
            setFormData({
                title: '',
                artist: '',
                created_at: '',
            });
        }
    }, [editingSong]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSong) {
            onUpdate({ ...editingSong, ...formData });
        } else {
            onCreate(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Artista:</label>
                <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Fecha de creación:</label>
                <input
                    type="datetime-local"
                    name="created_at"
                    value={formData.created_at}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">
                {editingSong ? 'Actualizar' : 'Crear'} Canción
            </button>
        </form>
    );
};

export default SongForm;
