import React from 'react';
import { useHistory } from 'react-router';

const Detail = () => {
  const history = useHistory();

  const handleExit = () => {
    history.push('/');
  };

  return (
    <div>
      <button onClick={() => handleExit()}>Terug</button>
    </div>
  );
};

export default Detail;
