import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const TMDB_API_KEY: string = process.env.TMDB_API_KEY!;

const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const fetchPopularMovies = async () => {
  try {
    const response = await tmdbAPI.get('movie/top_rated?language=en-us');
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchMovieById = async (movieId: number | string) => {
  try {
    const response = await tmdbAPI.get(`movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchMoviesByName = async (query: string) => {
  try {
    const response = await tmdbAPI.get('search/movie', {
      params: {
        api_key: TMDB_API_KEY,
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};