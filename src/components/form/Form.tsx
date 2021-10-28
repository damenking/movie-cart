import React, { useState } from 'react';
import classNames from 'classnames';
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

  const inputContainerClassName = classNames('col-span-1', styles.InputContainer);
  const confirmContainerClassName = classNames(styles.ConfirmContainer, styles.InputContainer);

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
      <div className={ inputContainerClassName }>
        <label id='title-label' className='color-ink-plus-1'>Movie Title</label>
        <input
          className={styles.InputField}
          type='text'
          onChange={ handleTitleChange }
          value={ titleValue }
          aria-labelledby='title-label'
        />
      </div>
      <div className={ inputContainerClassName }>
        <label id='year-label' className='color-ink-plus-1'>Year</label>
        <input
          className={styles.InputField}
          type='text'
          onChange={ handleYearChange }
          value={ yearValue }
          aria-labelledby='year-label'
        />
      </div>
      <div className={ inputContainerClassName }>
        <button onClick={ handleSearchSubmit }>
          SEARCH
        </button>
      </div>
      <div className={ confirmContainerClassName }>
        <button onClick={ handleConfirmClick }>
          CONFIRM PLAYLIST ({ playListCount })
        </button>
      </div>
    </>
  );
}
