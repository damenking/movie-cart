import React from 'react';
import classNames from 'classnames';

import styles from './Header.module.css';

export default function Header() {
  const className = classNames(
    'col-span-4',
    'flex-center',
    'background-color-orange',
    styles.Header,
  );
  return (
    <header className={ className }>
      <h2>Movie Cart</h2>
    </header>
  );
}
