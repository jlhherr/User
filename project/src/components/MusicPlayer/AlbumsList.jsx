import React, { useEffect, useState, useRef } from "react";
import useFetch from "../../hooks/useFetch";

function AlbumList() {
    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef();

    const { data, isLoading: fetchLoading, isError: fetchError, doFetch } = useFetch();

    useEffect(() => {
        const fetchAlbums = async () => {
            setIsLoading(true);
            const query = new URLSearchParams({
                page,
                page_size: 5,
                ordering: `-created_at`,
                public: true, 
            }).toString();

            try {
                await doFetch({
                    url: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/?${query}`,
                    method: "GET",
                });
                if (data && data.results) {
                    setAlbums((prevAlbums) => [...prevAlbums, ...data.results]);
                    setHasMore(!!data.next);
                }
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlbums();
    }, [page]);

    useEffect(() => {
        if (fetchLoading || !hasMore) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        const lastAlbumElement = document.querySelector(".album-list-item:last-child");
        if (lastAlbumElement) {
            observerRef.current.observe(lastAlbumElement);
        }
    }, [fetchLoading, hasMore]);

    if (isError) return <p>Error loading albums.</p>;
    if (!albums.length && !isLoading) return <p>No albums available.</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Public Albums</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {albums.map((album) => (
                    <div
                        key={album.id}
                        className="album-list-item p-4 bg-white rounded-lg shadow-md"
                    >
                        <h3 className="text-xl font-semibold mb-2">{album.title}</h3>
                        <p className="text-gray-700">{album.artist}</p>
                        <p className="text-gray-500">{album.release_date}</p>
                        {/* */}
                    </div>
                ))}
            </div>
            {isLoading && <p className="text-center mt-4">Loading more albums...</p>}
        </div>
    );
}

export default AlbumList;
