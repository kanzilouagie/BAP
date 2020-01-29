import React from 'react';
import { Link } from 'react-router-dom';

const PersonalInformation = () => {
  return (
    <>
      <h1>PersonalInformation</h1>
      <button>
        <Link to="/step4">Step4</Link>
      </button>
    </>
  );
};

export default PersonalInformation;
