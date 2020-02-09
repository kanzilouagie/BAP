import React from 'react';
import Router from './components/Router';
import { StoreProvider } from './store/StoreProvider';
import domtoimage from 'dom-to-image';

const App = () => {
  const handleImage = async () => {
    const node = document.querySelector('.container');
    const dataUrl = await domtoimage.toJpeg(node);

    const link = document.createElement('a');
    link.download = 'my-image-name.jpeg';
    link.href = dataUrl;
    link.click();
  };

  return (
    <StoreProvider>
      <button onClick={() => handleImage()}>image</button>
      <div className="container" style={{ position: 'relative', zIndex: '2' }}>
        <Router />
      </div>
    </StoreProvider>
  );
};

export default App;
