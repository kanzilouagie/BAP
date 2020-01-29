import React from 'react';
import app from '../../Authentication/base';
import { Link } from 'react-router-dom';
const CustomizeRunner = () => {
  return (
    <>
      <h1>CustomizeRunner</h1>
      <button>
        <Link to="/step3">Step3</Link>
      </button>
    </>
  );
};

export default CustomizeRunner;
