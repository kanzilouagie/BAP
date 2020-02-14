import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';

const Button = ({ children, ...otherProps }) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 1rem 1.5rem;
  height: ${({ height }) => (height ? height : 'auto')};
  width: ${({ width }) => (width ? width : 'auto')};
  color: ${({ border }) => (border ? border : 'black')};
  font-size: 1.6rem;
  background-color: ${({ color }) => (color ? color : 'transparent')};
  border: solid black 0.2rem;
  border-color: ${({ border }) => (border ? border : 'black')};
  border-radius: 1rem;
  font-size: 2rem;
  position: relative;
  transition: 0.1s;
  top: ${props => (props.active || props.disabled ? '0.6rem' : '0')};
  cursor: pointer;

  &::after {
    content: '';
    display: inline-block;
    background-color: ${({ color }) => (color ? color : 'transparent')};
    border: solid black 0.2rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-color: ${({ border }) => (border ? border : 'black')};
    border-top: none;
    position: absolute;
    top: ${props => (props.active || props.disabled ? '0.4rem' : '1rem')};
    left: -0.2rem;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: 0.1s;
  }

  &:active {
    top: 0.6rem;
    &::after {
      top: 0.4rem;
    }
  }
`;

Button.propTypes = {
  children: node.isRequired
};

export default Button;
