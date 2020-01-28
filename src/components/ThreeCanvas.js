import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { loadThree, detectMouseMove } from '../three/setup';
import { getIntersects } from '../three/store';

const ThreeCanvas = () => {
  const threeCanvas = useRef(null);

  useEffect(() => {
    loadThree(threeCanvas);
  }, []);

  const handleClick = () => {
    const intersects = getIntersects();
    if (intersects && intersects.length > 0) {
      console.log(intersects[0].object.message);
    }
  };

  return (
    <Canvas
      ref={threeCanvas}
      onMouseMove={e => detectMouseMove(e, threeCanvas)}
      onClick={() => handleClick()}
    />
  );
};

const Canvas = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

export default ThreeCanvas;
