import React from 'react';
import classNames from 'classnames';
import Header from './components/header/Header';

import './globalStyles.css';
import styles from './App.module.css';

export default function App() {
  // const className = classNames(Layout);
  const mainClassName = classNames('col-span-4 grid-mobile-layout', styles.Main);
  return (
    <div className={ styles.App }>
      <Header />
      <main className={ mainClassName }>
        <h5 className='col-span-4'>Search for movies to add to your playlist and then checkout with them!</h5>
      </main>
    </div>
  );
}
