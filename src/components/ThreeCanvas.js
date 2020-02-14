import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { loadThree, clickedCanvas } from '../three/setup';
import { objectIsClicked } from '../three/runnersWorld';
import { useHistory } from 'react-router';
import { getSelectedObject } from '../three/store';

const ThreeCanvas = () => {
  const threeCanvas = useRef(null);
  const history = useHistory();
  useEffect(() => {
    loadThree(threeCanvas);
  }, []);

  const handleClick = e => {
    clickedCanvas(e, threeCanvas);
    const interectedScene = getSelectedObject();
    if (interectedScene) {
      objectIsClicked(interectedScene, history);
    }
  };

  return <Canvas ref={threeCanvas} onClick={e => handleClick(e)} />;
};

const Canvas = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

export default ThreeCanvas;
