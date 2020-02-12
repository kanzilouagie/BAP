import styled from 'styled-components';

const SecondaryButton = styled.a`
  cursor: pointer;
  text-shadow: 0 -2px 0 #181a3e, 0 1px 1px #6066c2;
  box-sizing: border-box;
  font-size: 2em;
  font-family: Helvetica, Arial, Sans-Serif;
  text-decoration: none;
  font-weight: bold;
  color: #262a63;
  height: ${props => props.height || '40px'};
  line-height: ${props => props.height || '40px'};
  display: inline-block;
  width: ${props => props.width || '40px'};
  padding: ${props => props.padding || '40px'};
  background: linear-gradient(to bottom, #222ee6 0%, #323bc7 26%, #343988 100%);
  border-radius: 5px;
  border-top: 1px solid #676dc5;
  border-bottom: 1px solid #6066c2;
  top: 0;
  transition: all 0.06s ease-out;
  position: relative;

  &:visited {
    color: #262a63;
  }
  &:hover {
    background: linear-gradient(
      to bottom,
      #2c37e7 0%,
      #3740cc 26%,
      #373c8f 100%
    );
  }
  &:active {
    top: 6px;
    text-shadow: 0 -2px 0 #343988, 0 1px 1px #6066c2, 0 0 4px white;
    color: #3b419a;
  }
  &:active:before {
    top: 0;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
  }
  &:before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
    top: 6px;
    border-radius: 5px;
    height: ${props => props.height || '38px'};
    background: linear-gradient(to top, #000 0%, #0e102f 6px);
    transition: all 0.078s ease-out;
    box-shadow: 0 1px 0 2px rgba(0, 0, 0, 0.3), 0 5px 2.4px rgba(0, 0, 0, 0.5),
      0 10.8px 9px rgba(0, 0, 0, 0.2);
  }
`;

export default SecondaryButton;
