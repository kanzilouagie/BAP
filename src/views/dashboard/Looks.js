import React, { useContext, useEffect } from 'react';
import SideNavigation from '../../components/SideNavigation';
import globals from '../../three/globals';
import ProfileScene from '../../three/scenes/ProfileScene';
import { StoreContext } from '../../store/StoreProvider';
import { useHistory } from 'react-router';
import gsap from 'gsap';
import styled from 'styled-components';
import CustomizerInputRow from '../../components/CustomizerInputRow';

const Looks = () => {
  const store = useContext(StoreContext);
  const history = useHistory();

  useEffect(() => {
    if (!store.isProfileLoaded) {
      gsap.to(globals.camera.rotation, 0.25, { x: 0 });
      setTimeout(() => {
        globals.currentScene = new ProfileScene();
        store.setIsProfileLoaded(true);
      }, 250);
    }
  }, [store]);

  useEffect(() => {
    return () => {
      globals.currentScene.scene.dispose();
      store.setIsProfileLoaded(false);
    };
  }, [history]);

  const handleItemChange = (val, category) => {
    globals.character[category] = val;
    globals.currentScene.changeLook();
  };

  return (
    <>
      <h1>Looks</h1>
      <StyledDiv>
        <h1>Personaliseer deelnemer</h1>
        <CustomizerInputRow
          category="head"
          onChange={(val, category) => handleItemChange(val, category)}
          initialValue={globals.character.head}
        />
      </StyledDiv>
      <SideNavigation />
    </>
  );
};

const StyledDiv = styled.div`
  background-color: green;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export default Looks;
