import React, { useState, useRef, useEffect } from 'react';

function MusicPlayer({ currentSong }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef("");

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSong]); // Reproduce la canción cuando se cambia `currentSong`

    const handlePlayPause = () => {
        setIsPlaying(prevIsPlaying => !prevIsPlaying);
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex items-center justify-between">
            {currentSong ? (
                <>
                    <div>
                        <h3 className="text-lg font-bold">{currentSong.title}</h3>
                        <p>{currentSong.artist}</p>
                    </div>
                    <div className="flex items-center">
                        <button onClick={handlePlayPause} className="p-2 bg-blue-500 rounded">
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <audio ref={audioRef} src={currentSong.audioUrl} />
                    </div>
                </>
            ) : (
                <p>No song selected</p>
            )}
        </div>
    );
}

export default MusicPlayer;
