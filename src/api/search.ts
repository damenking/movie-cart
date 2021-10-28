import { MovieDetail, MoviesBySearchRequest, MoviesBySearchResponse } from '../types';

const imdbApiUrl = 'https://www.omdbapi.com/';
const key = 'f8ed3209';

export const fetchMoviesBySearch = async ({ title, year, page }: MoviesBySearchRequest) => {
  const yearParam = year && `&y=${year}`;
  const url = `${imdbApiUrl}?s=${title}&type=movie&page=${page}${yearParam}&apikey=${key}`;
  const response = await fetch(url);
  const { Search, totalResults, Error } = await response.json() as MoviesBySearchResponse;
  if (!Error) {
    return {
      movies: Search,
      totalResults,
    };
  }
  return {
    movies: [] as MovieDetail[],
    totalResults: '0',
  };
};
