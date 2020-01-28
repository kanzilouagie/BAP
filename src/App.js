import React from 'react';
import Router from './components/Router';
import ThreeCanvas from './components/ThreeCanvas';

const App = () => {
  return (
    <>
      {/* ThreeJS canvas */}
      <div style={{ position: 'relative', zIndex: '2' }}>
        <Router />
      </div>
      <ThreeCanvas />
    </>
  );
};

export default App;
