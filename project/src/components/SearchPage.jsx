import React, { useState } from 'react';
import { fetchSongs } from '../services/api';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Simulate a search API call
    console.log('Searching for:', query);
    // Update results with simulated data
    setResults([{ id: 1, title: 'Song 1' }, { id: 2, title: 'Song 2' }]);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for songs, playlists, or artists"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {results.map((result) => (
          <div key={result.id}>
            {result.title}
            <button onClick={() => console.log('Downloading', result.title)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
