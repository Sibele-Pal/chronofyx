import React, { useEffect, useState } from "react";
import { fetchTracksByTag } from "./services/lastfm";
import { artistsData } from "./data/mockData";
import { motion } from "framer-motion";

function App() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2010);

  // 🎯 Convert year → tag
  const getTagFromYear = (year) => {
    if (year < 2010) return "2000s";
    if (year < 2020) return "2010s";
    return "2020s";
  };

  // 🎨 Background vibes
  const getBackground = (year) => {
    if (year < 2010) return "bg-gradient-to-br from-purple-900 to-black";
    if (year < 2020) return "bg-gradient-to-br from-blue-900 to-black";
    return "bg-gradient-to-br from-red-900 to-black";
  };

  const loadData = async (selectedTag) => {
    setLoading(true);

    const data = await fetchTracksByTag(selectedTag);

    if (!data || data.length === 0) {
      setArtists(artistsData);
    } else {
      setArtists(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    const tag = getTagFromYear(year);
    loadData(tag);
  }, [year]);

  return (
    <div className={`min-h-screen ${getBackground(year)} text-white px-6 py-10`}>

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold">Chronofyx</h1>
        <p className="text-gray-400 mt-2">
          relive your music timeline 🎵
        </p>
      </div>

      {/* 🎚️ YEAR SLIDER */}
      <div className="flex flex-col items-center mb-10">
        <input
          type="range"
          min="2000"
          max="2020"
          step="10"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-64"
        />

        <p className="mt-2 text-lg text-gray-300">{year}s</p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {artists.map((item, index) => {
            const title = item.name || "Unknown";
            const artist = item.artist?.name || "";

            const image = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              title
            )}&background=111&color=fff&size=300`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl bg-zinc-900">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <p className="mt-2 text-sm text-gray-200">{title}</p>
                <p className="text-xs text-gray-400">{artist}</p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;