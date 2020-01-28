import React, { useEffect } from 'react';
import app from '../authentication/base';
import { loadRunnersWorld } from '../three/runnersWorld';

const Home = () => {
  useEffect(() => {
    loadRunnersWorld();
  }, []);
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Home;
