import React, { useState } from 'react';
import { MoviesBySearchRequest } from '../../types';

import styles from './Form.module.css';

interface FormProps {
  onSubmit: ({ title, year, page }: MoviesBySearchRequest) => void;
  playListCount: number;
  setConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Form({
  onSubmit,
  playListCount,
  setConfirmationOpen,
}: FormProps) {
  const [ titleValue, setTitleValue ] = useState('');
  const [ yearValue, setYearValue ] = useState('');

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleValue(e.target.value);
  }
  function handleYearChange(e: React.ChangeEvent<HTMLInputElement>) {
    setYearValue(e.target.value);
  }
  function handleSearchSubmit() {
    onSubmit({ title: titleValue, year: yearValue, page: 1 });
  }
  function handleConfirmClick() {
    setConfirmationOpen(true);
  }
  return (
    <>
      <div className={ styles.InputContainer }>
        <label id='title-label' className={ styles.Label }>Movie Title</label>
        <input
          className={styles.InputField}
          type='text'
          onChange={ handleTitleChange }
          value={ titleValue }
          aria-labelledby='title-label'
        />
      </div>
      <div className={ styles.InputContainer }>
        <label id='year-label' className={ styles.Label }>Year</label>
        <input
          className={styles.InputField}
          type='text'
          onChange={ handleYearChange }
          value={ yearValue }
          aria-labelledby='year-label'
        />
      </div>
      <div className={ styles.ButtonContainer }>
        <button onClick={ handleSearchSubmit }>
          SEARCH
        </button>
        <button onClick={ handleConfirmClick } disabled={ playListCount === 0}>
          CONFIRM PLAYLIST ({ playListCount })
        </button>
      </div>
    </>
  );
}
