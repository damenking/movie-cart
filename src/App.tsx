import React, { useReducer, useState } from 'react';
import classNames from 'classnames';
import { fetchMoviesBySearch } from './api/search';
import { MoviesBySearchRequest } from './types';
import Header from './components/header/Header';
import Form from './components/form/Form';
import MovieItem from './components/movieitem/MovieItem';
import Confirmation from './components/confirmation/Confirmation';
import { reducer, initialState } from './state';
import './globalStyles.css';
import styles from './App.module.css';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const appClassName = classNames('grid-mobile-layout', styles.App);

  async function handleSearchSubmit({ title, year }: MoviesBySearchRequest): Promise<void> {
    const { movies, totalResults } = await fetchMoviesBySearch({ title, year, page: 1 });
    dispatch({
      type: 'MOVIES_SET',
      payload: {
        page: 1,
        movies,
        totalResults: parseInt(totalResults, 10),
        title,
        year,
      },
    });
  }
  async function handlePageChange(page: number): Promise<void> {
    const { movies, totalResults } = await fetchMoviesBySearch({
      title: state.title,
      year: state.year,
      page,
    });
    dispatch({
      type: 'MOVIES_SET',
      payload: {
        page,
        movies,
        totalResults: parseInt(totalResults, 10),
        title: state.title,
        year: state.year,
      },
    });
  }
  
  const {
    movies,
    totalResults,
    currentPage,
    playlist,
  } = state;
  if (confirmationOpen) {
    return (
      <div className={ appClassName }>
        <Confirmation dispatch={ dispatch } playlist={ playlist } setConfirmationOpen={ setConfirmationOpen }/>
      </div>
    );
  }
  return (
    <div className={ appClassName }>
      <Header />
      <main className={ styles.Main }>
        <h3 className='col-span-4'>
          Search for movies to add to your playlist and then confirm your movie playlist!
        </h3>
        <Form
          onSubmit={ handleSearchSubmit }
          playListCount={ Object.keys(playlist).length }
          setConfirmationOpen={ setConfirmationOpen }
        />
        <div className='col-span-3'>
          { totalResults && (
            <div>
              <h4><strong>Results:</strong></h4>
              <p>
                Showing {totalResults <= 10 ? movies.length : `${(currentPage - 1) * 10 + 1} - ${(currentPage - 1) * 10 + movies.length}` } of {totalResults} results
              </p>
              { movies.length < totalResults && (
                <div>
                  { currentPage !== 1 && <><span onClick={ () => handlePageChange(currentPage - 1) } className={ styles.PageLink }>Previous</span><span>&nbsp;</span></>}
                  { movies.length === 10 && (currentPage * 10 < totalResults) && (
                    <span onClick={ () => handlePageChange(currentPage + 1) } className={ styles.PageLink }>Next</span>
                  )}
                </div>
              )}
            </div>
          )}
          { movies.map((movie) => {
            return (
              <MovieItem
                key={ movie.imdbID }
                Title={ movie.Title }
                Year={ movie.Year }
                imdbID={ movie.imdbID }
                dispatch={ dispatch }
                playlist={ playlist }
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
