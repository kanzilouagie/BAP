import React from 'react';
import app from '../Authentication/base';

const Discover = () => {
  return (
    <>
      <h1>Discover</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Discover;
