export const fetchArtists = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/music");

    if (!res.ok) {
      throw new Error("Failed to fetch from backend");
    }

    const data = await res.json();
    console.log("Artists:", data);

    return data;
  } catch (err) {
    console.error("Error fetching artists:", err);
    return [];
  }
};