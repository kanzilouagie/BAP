import React from 'react';
import { Link } from 'react-router-dom';

const ChooseRunner = () => {
  return (
    <>
      <h1>ChooseRunner</h1>
      <button>
        <Link to="/step2">Step2</Link>
      </button>
    </>
  );
};

export default ChooseRunner;
