import React from "react";

function App() {
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
      <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
        
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Remix Time Through Music
        </h1>

        <p className="mt-4 text-gray-400 max-w-xl">
          Travel across decades and rediscover the artists, albums, and sounds 
          that defined every era.
        </p>

        <button className="mt-6 px-6 py-2 bg-white text-black rounded-full font-medium hover:scale-105 transition">
          Get Started
        </button>

      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-4 border-t border-gray-800">
        © {new Date().getFullYear()} Chronofyx
      </footer>

    </div>
  );
}

export default App;