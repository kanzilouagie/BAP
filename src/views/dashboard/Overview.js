import React from 'react';
import app from '../Authentication/base';

const Overview = () => {
  return (
    <>
      <h1>Overview</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Overview;