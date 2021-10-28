import React from 'react';
import classNames from 'classnames';

import styles from './Header.module.css';

export default function Header() {
  const className = classNames(
    'flex-center',
    styles.Header,
  );
  return (
    <header className={ className }>
      <h2>MOVIE CART</h2>
    </header>
  );
}
