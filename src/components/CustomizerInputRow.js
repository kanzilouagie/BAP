import React, { useState } from 'react';
import styled from 'styled-components';
import globals from '../three/globals';
import Button from './Button';
import arrow from '../assets/icons/arrow.svg';
import bril from '../assets/images/bril.png';
import SOCKS from '../assets/images/sportsokken.png';
import hoofdbandje from '../assets/images/hoofdband.png';
import piercing from '../assets/images/piercing.png';
import zwembandjes from '../assets/images/zwem-armbandjes.png';
import zweetbandjes from '../assets/images/zweetbandjes.png';
import { string, func } from 'prop-types';

const CustomizerInputRow = ({ category, onChange }) => {
  const [value, setValue] = useState(globals.character[category]);

  const items = {
    head: {
      piercing,
      hoofdbandje
    },
    body: {
      zwembandjes,
      bril,
      zweetbandjes
    },
    foot: {
      SOCKS
    }
  };

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
        <img style={{ marginTop: 0 }} src={arrow} alt="arrow" />
      </Button>{' '}
      <Item src={items[category][globals.looks[category][value]] || null} />
      <Button
        border="#343988"
        onClick={() => handleChange(1)}
        disabled={value >= globals.looks[category].length - 1}
      >
        <img
          style={{ marginTop: 0, transform: 'rotate(180deg)' }}
          src={arrow}
          alt="arrow"
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

const Item = styled.img`
  width: auto;
  height: 6rem;
`;

CustomizerInputRow.proptTypes = {
  category: string.isRequired,
  onChange: func.isRequired
};

export default CustomizerInputRow;
