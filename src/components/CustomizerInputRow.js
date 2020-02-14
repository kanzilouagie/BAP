import React, { useState } from 'react';
import styled from 'styled-components';
import globals from '../three/globals';
import Button from './Button';
import arrow from '../assets/icons/arrow.svg';

const CustomizerInputRow = ({ category, onChange }) => {
  const [value, setValue] = useState(globals.character[category]);

  const handleChange = val => {
    const newValue = value + val;
    setValue(newValue);
    onChange(newValue, category);
  };

  return (
    <Container>
      <Button
        border="#343988"
        onClick={() => handleChange(-1)}
        disabled={value === 0}
      >
        <img style={{ marginTop: 0 }} src={arrow} />
      </Button>{' '}
      <p>{value}</p>{' '}
      <Button
        border="#343988"
        onClick={() => handleChange(1)}
        disabled={value >= globals.looks[category].length - 1}
      >
        <img
          style={{ marginTop: 0, transform: 'rotate(180deg)' }}
          src={arrow}
        />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 25rem;
  display: flex;
  width: 80%;
  justify-content: space-between;
`;

export default CustomizerInputRow;
