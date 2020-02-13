import React, { useState } from 'react';
import styled from 'styled-components';
import globals from '../three/globals';

const CustomizerInputRow = ({ category, onChange }) => {
  const [value, setValue] = useState(globals.character[category]);

  const handleChange = val => {
    const newValue = value + val;
    setValue(newValue);
    onChange(newValue, category);
  };

  return (
    <Container>
      <button onClick={() => handleChange(-1)} disabled={value === 0}>
        Left
      </button>{' '}
      <p>{value}</p>{' '}
      <button
        onClick={() => handleChange(1)}
        disabled={value >= globals.looks[category].length - 1}
      >
        Right
      </button>
    </Container>
  );
};

const Container = styled.div`
  width: 30rem;
  display: flex;
  width: 80%;
  justify-content: space-between;
  /* background-color: green; */
`;

export default CustomizerInputRow;
