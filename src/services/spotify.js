const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

// Get token WITHOUT secret (public flow)
export const getAccessToken = async () => {
  const res = await fetch(
    `https://accounts.spotify.com/api/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}`,
    }
  );

  const data = await res.json();
  return data.access_token;
};

export const fetchArtists = async () => {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/search?q=top&type=artist&limit=8",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return data.artists.items;
};