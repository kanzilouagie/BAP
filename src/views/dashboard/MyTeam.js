import React from 'react';
import app from '../Authentication/base';

const MyTeam = () => {
  return (
    <>
      <h1>MyTeam</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default MyTeam;