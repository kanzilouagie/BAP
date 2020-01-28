import React from 'react';
import app from '../Authentication/base';

const ChooseRunner = () => {
  return (
    <>
      <h1>ChooseRunner</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default ChooseRunner;
