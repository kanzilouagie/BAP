import React from 'react';
import app from '../Authentication/base';

const Looks = () => {
  return (
    <>
      <h1>Looks</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Looks;