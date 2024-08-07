import { handleAsync } from "./utils";

const API_KEY = "ddb3f977";
const QUERY_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;
const IMDB_ID_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=`;

export const getMovieByQuery = handleAsync(async function (query) {
  query = query.toLowerCase().trim();
  const res = await fetch(QUERY_URL + query);
  if (!res.ok) throw new Error("💥 Error fetching data");
  const data = await res.json();
  return data;
});

export const getMovieById = handleAsync(async function (id) {
  id = id.trim();
  const res = await fetch(IMDB_ID_URL + id);
  if (!res.ok) throw new Error("💥 Error fetching data");
  const data = await res.json();
  return data;
});
