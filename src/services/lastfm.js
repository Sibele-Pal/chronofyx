const API_KEY = "df80cfc1dfff0f31b920fbc986e4ae88";

export const fetchTracksByTag = async (tag = "pop") => {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tag}&api_key=${API_KEY}&format=json&limit=20`
    );

    const data = await res.json();
    return data.tracks.track;
  } catch (err) {
    console.error(err);
    return [];
  }
};