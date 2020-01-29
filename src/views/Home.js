import React from 'react';
import app from '../authentication/base';
import { moveCamera } from '../three/runnersWorld';

const Home = () => {
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
