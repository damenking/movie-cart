import React, { useState, useEffect } from 'react';
import { MovieDetail } from '../../types';
import { Actions } from '../../state';
import styles from './MovieItem.module.css';

const imdbUrl = 'https://www.imdb.com/title/';

interface MovieItemProps extends MovieDetail {
  dispatch: React.Dispatch<Actions>
  playlist: {
    [key: string]: MovieDetail;
  };
}

export default function MovieItem({
  Title,
  imdbID,
  Year,
  dispatch,
  playlist,
}: MovieItemProps) {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (playlist[imdbID]) {
      setAdded(true);
    }
  }, [playlist]);
  function handleAddToPlaylist(movie: MovieDetail) {
    dispatch({
      type: 'ADD_TO_PLAYLIST',
      payload: {
        imdbID,
        movie,
      },
    });
  }
  function handleAddClick() {
    if (!added) {
      handleAddToPlaylist({
        Title,
        imdbID,
        Year,
      });
    }
  }
  return (
    <div className={ styles.MovieItem }>
      <button onClick={ handleAddClick }>{ added ? 'Added' : 'Add' }</button>
      <h4><a href={ `${imdbUrl}${imdbID}` } target='_blank' rel='noopener noreferrer'>{ Title }</a>&nbsp;({ Year })</h4>
    </div>
  );
}