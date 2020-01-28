import React from 'react';
import app from '../Authentication/base';

const Messages = () => {
  return (
    <>
      <h1>Messages</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Messages;
