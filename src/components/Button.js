import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';

const Button = ({ children, ...otherProps }) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 1rem 1.5rem;
  color: black;
  font-size: 1.6rem;
  background-color: ${({ color }) => (color ? color : '#ff9faa')};
  border: solid black 0.2rem;
  border-color: ${({ border }) => (border ? border : 'black')};
  border-radius: 1rem;
  position: relative;
  transition: 0.3s;

  &::after {
    content: '';
    display: inline-block;
    background-color: ${({ color }) => (color ? color : '#ff9faa')};
    border: solid black 0.2rem;
    border-radius: 1rem;
    position: absolute;
    top: ${props => (props.active ? '0.2rem' : '0.5rem')};
    left: -0.2rem;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;

Button.propTypes = {
  children: node.isRequired
};

export default Button;
