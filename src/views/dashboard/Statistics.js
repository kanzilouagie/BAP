import React from 'react';
import app from '../Authentication/base';

const Statistics = () => {
  return (
    <>
      <h1>Statistics</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Statistics;