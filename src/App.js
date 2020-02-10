import React, { useEffect } from 'react';
import Router from './components/Router';
import { StoreProvider } from './store/StoreProvider';
import loadThree from './three/setup.js';

const App = () => {
  useEffect(() => {
    loadThree();
  }, []);
  return (
    <StoreProvider>
      <div style={{ position: 'relative', zIndex: '2' }}>
        <Router />
      </div>
    </StoreProvider>
  );
};

export default App;
