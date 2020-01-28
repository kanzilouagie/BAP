import React, { useEffect } from 'react';
import app from '../authentication/base';
import { loadRunnersWorld, moveCamera } from '../three/runnersWorld';

const Home = () => {
  useEffect(() => {
    loadRunnersWorld();
  }, []);
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
      <>
        <button onClick={() => moveCamera('LEFT')}>Move left</button>
        <button onClick={() => moveCamera('RIGHT')}>Move right</button>
      </>
    </>
  );
};

export default Home;