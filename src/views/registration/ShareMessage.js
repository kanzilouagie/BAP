import React from 'react';
import app from '../../Authentication/base';
import { Link } from 'react-router-dom';
const ShareMessage = () => {
  return (
    <>
      <h1>ShareMessage</h1>
      <button>
        <Link to="/">Naar profiel</Link>
      </button>
    </>
  );
};

export default ShareMessage;
