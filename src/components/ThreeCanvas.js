import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { loadThree } from '../three/setup';

const ThreeCanvas = () => {
  const threeCanvas = useRef(null);

  useEffect(() => {
    loadThree(threeCanvas);
  }, []);
  return <Canvas ref={threeCanvas} />;
};

const Canvas = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

export default ThreeCanvas;
