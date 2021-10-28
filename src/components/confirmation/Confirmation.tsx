import React, { useState } from 'react';
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
  const [playlistConfirmed, setPlaylistConfirmed] = useState(false);
  const confirmationBodyClassName = classNames('flex-center', 'flex-column', styles.ConfirmationScreenBody);
  const confirmationFooterClassName = classNames('flex-center', styles.ConfirmationScreenFooter);

  function handleCancelClick() {
    setConfirmationOpen(false);
  }
  function handleConfirmClick() {
    setPlaylistConfirmed(true);
    dispatch({
      type: 'RESET',
    });
  }

  return (
    <div className={ styles.ConfirmationScreen }>
      <div className={ confirmationBodyClassName }>
        { !playlistConfirmed && (
          <>
            <h2>Confirm these movies?</h2>
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
                    <h4>{ playlist[imdbId].Title }&nbsp;({ playlist[imdbId].Year })</h4>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        { playlistConfirmed && (
          <>
            <h2>Playlist confirmed. Thank you!</h2>
            <button onClick={ handleCancelClick }>Close</button>
          </>
        )}
      </div>
      <div className={ confirmationFooterClassName }>
        <h3>My favorite color is maroon</h3>
      </div>
    </div>
  );
}
