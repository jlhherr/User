import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Asumiendo que tienes un contexto de autenticación

export default function Home() {
    const { username } = useAuth("actions"); // Obtener información del usuario desde el contexto

    return (
        <div>
            <Navbar appName="MusicApp" /> {/* Aquí se pasa el nombre de la aplicación al NavBar */}
            <main className="container mx-auto p-4">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">Welcome to MusicApp</h1>
                    <p className="text-lg text-gray-700">Discover and enjoy your favorite music</p>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Featured Playlists */}
                    <section className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Featured Playlists</h2>
                        <ul>
                            <li className="mb-2">
                                <Link to="/playlists/1" className="text-blue-500 hover:underline">
                                    Chill Vibes
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/playlists/2" className="text-blue-500 hover:underline">
                                    Top Hits
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/playlists/3" className="text-blue-500 hover:underline">
                                    Workout Essentials
                                </Link>
                            </li>
                        </ul>
                    </section>
                    {/* Recently Played */}
                    <section className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
                        <ul>
                            <li className="mb-2">
                                <Link to="/songs/1" className="text-blue-500 hover:underline">
                                    Song Title 1
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/songs/2" className="text-blue-500 hover:underline">
                                    Song Title 2
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/songs/3" className="text-blue-500 hover:underline">
                                    Song Title 3
                                </Link>
                            </li>
                        </ul>
                    </section>
                    {/* Search */}
                    <section className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Search Music</h2>
                        <form action="/search" method="get">
                            <input
                                type="text"
                                name="query"
                                placeholder="Search for songs, artists, or albums"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <button
                                type="submit"
                                className="mt-2 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Search
                            </button>
                        </form>
                    </section>
                </div>
                <footer className="text-center mt-8">
                    {username ? (
                        <p className="text-gray-700">Logged in as {user.name}</p>
                    ) : (
                        <p className="text-gray-700">Please <Link to="/login" className="text-blue-500 hover:underline">log in</Link> to access more features.</p>
                    )}
                </footer>
            </main>
        </div>
    );
}
