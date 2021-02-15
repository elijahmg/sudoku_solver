import React from 'react';

import Grid from './components/Grid/Grid';

import styles from './App.module.scss';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className={styles.App}>
      <Grid />
    </div>
  );
}

export default App;
