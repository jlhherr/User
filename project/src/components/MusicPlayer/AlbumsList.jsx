import React, { useEffect, useState, useRef } from "react";

function AlbumList() {
    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(1);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const observerRef = useRef();
    const lastAlbumElementRef = useRef();

    const doFetch = async () => {
        setIsLoading(true);
        const query = new URLSearchParams({
            page,
            page_size: 5,
            ordering: `-created_at`,
            public: true, // Assuming the API uses this query param to filter public albums
        }).toString();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/?${query}`
            );
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            if (data.results) {
                setAlbums((prevAlbums) => [...prevAlbums, ...data.results]);
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
    }, [page]);

    useEffect(() => {
        if (isLoading) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextUrl) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (lastAlbumElementRef.current) {
            observerRef.current.observe(lastAlbumElementRef.current);
        }
    }, [isLoading, nextUrl]);

    if (isError) return <p>Error loading albums.</p>;
    if (!albums.length && !isLoading) return <p>No albums available.</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Public Albums</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {albums.map((album, index) => {
                    if (albums.length === index + 1) {
                        return (
                            <div
                                key={album.id}
                                ref={lastAlbumElementRef}
                                className="p-4 bg-white rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold mb-2">{album.title}</h3>
                                <p className="text-gray-700">{album.artist}</p>
                                <p className="text-gray-500">{album.release_date}</p>
                                {/* You can add more details or an album cover here */}
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={album.id}
                                className="p-4 bg-white rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold mb-2">{album.title}</h3>
                                <p className="text-gray-700">{album.artist}</p>
                                <p className="text-gray-500">{album.release_date}</p>
                                {/* You can add more details or an album cover here */}
                            </div>
                        );
                    }
                })}
            </div>
            {isLoading && <p className="text-center mt-4">Loading more albums...</p>}
        </div>
    );
}

export default AlbumList;
