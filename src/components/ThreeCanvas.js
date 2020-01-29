import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { loadThree, detectMouseMove } from '../three/setup';
import { getIntersects } from '../three/store';
import { objectIsClicked } from '../three/runnersWorld';
import { useHistory } from 'react-router';

const ThreeCanvas = () => {
  const threeCanvas = useRef(null);
  const history = useHistory();
  useEffect(() => {
    loadThree(threeCanvas);
  }, []);

  const handleClick = () => {
    const intersects = getIntersects();
    if (intersects && intersects.length > 0) {
      //runnersWorld
      objectIsClicked(intersects[0], history);
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
