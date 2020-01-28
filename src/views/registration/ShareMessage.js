import React from 'react';
import app from '../Authentication/base';

const ShareMessage = () => {
  return (
    <>
      <h1>ShareMessage</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default ShareMessage;