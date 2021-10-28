import { MovieDetail } from './types';

export interface State {
  currentPage: number;
  movies: MovieDetail[];
  totalResults: number | null;
  title: string;
  year: string;
  playlist: {
    [key: string]: MovieDetail;
  };
}
export interface MoviesSetAction {
  payload: {
    page: number;
    movies: MovieDetail[];
    totalResults: number;
    title: string;
    year: string;
  };
  type: 'MOVIES_SET';
}
export interface AddToPlaylistAction {
  payload: {
    imdbID: string;
    movie: MovieDetail;
  };
  type: 'ADD_TO_PLAYLIST';
}
export interface ResetAction {
  type: 'RESET',
}
export type Actions = MoviesSetAction | AddToPlaylistAction | ResetAction;

export const initialState: State = {
  currentPage: 1,
  movies: [],
  totalResults: null,
  title: '',
  year: '',
  playlist: {},
};

export function reducer(state: State, action: Actions) {
  if (action.type === 'MOVIES_SET') {
    return {
      ...state,
      currentPage: action.payload.page,
      movies: action.payload.movies,
      totalResults: action.payload.totalResults,
      title: action.payload.title,
      year: action.payload.year,
    };
  } else if (action.type === 'ADD_TO_PLAYLIST') {
    return {
      ...state,
      playlist: {
        ...state.playlist,
        [action.payload.imdbID]: action.payload.movie
      },
    };
  } else if (action.type === 'RESET') {
    return initialState;
  }
  else {
    throw new Error();
  }
}