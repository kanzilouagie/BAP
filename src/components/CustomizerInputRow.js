import React, { useState } from 'react';
import styled from 'styled-components';

const CustomizerInputRow = ({ category, onChange, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = val => {
    const newValue = value + val;
    setValue(newValue);
    onChange(newValue, category);
  };

  return (
    <Container>
      <button onClick={() => handleChange(1)}>Left</button> <p>{value}</p>{' '}
      <button onClick={() => handleChange(-1)}>Right</button>
    </Container>
  );
};

const Container = styled.div`
  width: 30rem;
  background-color: green;
`;

export default CustomizerInputRow;
