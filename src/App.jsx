import React, { useEffect, useState } from "react";
import { fetchArtists } from "./services/spotify";

function App() {
  const [artists, setArtists] = useState([]);
  const [year, setYear] = useState(2010);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchArtists(year); // future-ready
        setArtists(data);

      } catch (err) {
        setError("Failed to load artists");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [year]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xl font-semibold tracking-wide">
          Chronofyx 🎧
        </h1>
        <button className="text-sm px-4 py-1 border border-gray-600 rounded-full hover:bg-white hover:text-black transition">
          Explore
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-4 relative">

        {/* Glow */}
        <div className="absolute w-[400px] h-[400px] bg-purple-600 opacity-20 blur-3xl rounded-full"></div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight z-10">
          Remix Time Through Music
        </h1>

        <p className="mt-4 text-gray-400 max-w-xl z-10">
          Travel across decades and rediscover the artists, albums, and sounds 
          that defined every era.
        </p>

        <button className="mt-6 px-6 py-2 bg-white text-black rounded-full font-medium hover:scale-105 transition z-10">
          Get Started
        </button>

        {/* Year Slider */}
        <div className="mt-10 w-full max-w-md text-center z-10">
          <p className="text-gray-400 mb-2">
            Selected Year:{" "}
            <span className="text-white font-semibold">{year}</span>
          </p>

          <input
            type="range"
            min="1960"
            max="2024"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Artists Section */}
      <div className="px-6 pb-10">
        <h2 className="text-xl font-semibold mb-4">
          Top Artists in {year}
        </h2>

        {/* Error */}
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : loading ? (
          <p className="text-gray-400">Loading artists...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition transform hover:scale-105"
              >
                <img
                  src={
                    artist.images?.[0]?.url ||
                    "https://via.placeholder.com/300"
                  }
                  alt={artist.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                <h3 className="text-sm font-medium">{artist.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-4 border-t border-gray-800">
        © {new Date().getFullYear()} Chronofyx
      </footer>

    </div>
  );
}

export default App;