import React, { useEffect } from 'react';
import Router from './components/Router';
import { StoreProvider } from './store/StoreProvider';

const App = () => {
  return (
    <StoreProvider>
      <div style={{ position: 'relative', zIndex: '2' }}>
        <Router />
      </div>
    </StoreProvider>
  );
};

export default App;
