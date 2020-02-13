import React, { useState } from 'react';
import styled from 'styled-components';
import globals from '../three/globals';
import Button from './Button';

const CustomizerInputRow = ({ category, onChange }) => {
  const [value, setValue] = useState(globals.character[category]);

  const handleChange = val => {
    const newValue = value + val;
    setValue(newValue);
    onChange(newValue, category);
  };

  return (
    <Container>
      <Button onClick={() => handleChange(-1)} disabled={value === 0}>
        Left
      </Button>{' '}
      <p>{value}</p>{' '}
      <Button
        onClick={() => handleChange(1)}
        disabled={value >= globals.looks[category].length - 1}
      >
        Right
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 30rem;
  display: flex;
  width: 80%;
  justify-content: space-between;
  /* background-color: green; */

  & > * {
    margin-bottom: 2rem;
  }
`;

export default CustomizerInputRow;
