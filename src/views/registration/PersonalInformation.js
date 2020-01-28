import React from 'react';
import app from '../Authentication/base';

const PersonalInformation = () => {
  return (
    <>
      <h1>PersonalInformation</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default PersonalInformation;