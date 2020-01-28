import React from 'react';
import app from '../Authentication/base';

const CustomizeRunner = () => {
  return (
    <>
      <h1>CustomizeRunner</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default CustomizeRunner;