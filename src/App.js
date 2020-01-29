import React from 'react';
import Router from './components/Router';
import { StoreProvider } from './store/StoreProvider';

const App = () => {
  return (
    <StoreProvider>
      {/* ThreeJS canvas */}
      <div style={{ position: 'relative', zIndex: '2' }}>
        <Router />
      </div>
    </StoreProvider>
  );
};

export default App;
