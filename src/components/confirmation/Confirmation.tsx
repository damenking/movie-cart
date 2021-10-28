import React from 'react';
import classNames from 'classnames';
import { MovieDetail } from '../../types';
import { Actions } from '../../state';

import styles from './Confirmation.module.css';

interface ConfirmationProps {
  playlist: {
    [key: string]: MovieDetail;
  };
  setConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<Actions>
}

export default function Confirmation({
  playlist,
  setConfirmationOpen,
  dispatch,
}: ConfirmationProps) {
  const confirmationBodyClassName = classNames('flex-center', 'flex-column', styles.ConfirmationScreenBody);
  const confirmationFooterClassName = classNames('flex-center', styles.ConfirmationScreenFooter);

  function handleCancelClick() {
    setConfirmationOpen(false);
  }
  function handleConfirmClick() {
    setConfirmationOpen(false);
    dispatch({
      type: 'RESET',
    });
  }

  return (
    <div className={ styles.ConfirmationScreen }>
      <div className={ confirmationBodyClassName }>
        <h4>Confirm these movies?</h4>
        <div className='flex-center'>
          <div className={ styles.ButtonContainer }>
            <button onClick={ handleCancelClick }>Cancel</button>
            <button onClick={ handleConfirmClick }>Confirm</button>
          </div>
        </div>
        <ul>
          { Object.keys(playlist).map(imdbId => {
            return (
              <li key={ imdbId }>
                { playlist[imdbId].Title }&nbsp;({ playlist[imdbId].Year })
              </li>
            );
          })}
        </ul>
      </div>
      <div className={ confirmationFooterClassName }>
        <h5>My favorite color is maroon</h5>
      </div>
    </div>
  );
}