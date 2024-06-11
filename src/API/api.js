const BASE_URL = "https://rawg.io/api";
const API_KEY = "d0454d87313942169b3b1153701996d9";

export async function fetchGames(pageNum) {
  const res = await fetch(`${BASE_URL}/games?&page=${pageNum}&key=${API_KEY}`);
  if (!res.ok) throw Error("Failed fetching games");
  const data = await res.json();
  return data;
}

export async function fetchGame(id) {
  const res = await fetch(`${BASE_URL}/games/${id}?&key=${API_KEY}`);
  if (!res.ok) throw Error("Failed to fetch game data");
  const data = await res.json();
  return data;
}

export async function fetchGameGenres() {
  const res = await fetch(`${BASE_URL}/genres?&key=${API_KEY}`);
  if (!res.ok) throw Error("Failed to fetch genres");
  const data = await res.json();
  return data;
}

export async function fetchCreators() {
  const res = await fetch(`${BASE_URL}/creators?&key=${API_KEY}`);
  if (!res.ok) throw Error("Failed to fetch creators");
  const data = await res.json();
  return data;
}

export async function fetchStores() {
  const res = await fetch(`${BASE_URL}/stores?&key=${API_KEY}`);
  if (!res.ok) throw Error("Failed to fetch stores");
  const data = await res.json();
  return data;
}

export async function fetchHeroSectionGenre() {
  const res = await fetch(`${BASE_URL}/genres?&key=${API_KEY}`);
  if (!res.ok) throw Error("Failed to fetch genre");
  const data = await res.json();
  return data;
}
