import React from 'react';

import Grid from './components/Grid/Grid';

import './App.scss';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <Grid />
    </div>
  );
}

export default App;
