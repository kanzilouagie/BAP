import React, { useContext, useEffect, useCallback, useState } from 'react';
import SideNavigation from '../../components/SideNavigation';
import globals from '../../three/globals';
import ProfileScene from '../../three/scenes/ProfileScene';
import { StoreContext } from '../../store/StoreProvider';
import { useHistory } from 'react-router';
import gsap from 'gsap';
import styled from 'styled-components';
import CustomizerInputRow from '../../components/CustomizerInputRow';
import { Power1 } from 'gsap/gsap-core';
import PrimaryButton from '../../components/PrimaryButton';
import firebase from '../../authentication/base';

const Looks = () => {
  const store = useContext(StoreContext);
  const history = useHistory();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (!store.isProfileLoaded) {
      gsap.to(globals.camera.rotation, 0.5, { ease: Power1.easeIn, x: 0.3 });
      setTimeout(() => {
        globals.currentScene = new ProfileScene();
        store.setIsProfileLoaded(true);
        globals.camera.rotation.x = 0;
        const setCharacterLook = async () => {
          const lookData = await (
            await firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .get()
          ).data();
          setIsDataLoaded(true);
          if (lookData.character) globals.character = lookData.character;
          globals.currentScene.changeLook(); // update
          // this.skinInstance.setAnimation('Run');
        };
        setCharacterLook();
      }, 600);
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
    globals.currentScene.changeLook(); // update
  };

  const handleSave = useCallback(() => {
    const localData = { ...globals.character };
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({ character: localData });
  }, [globals.character]);

  return (
    <>
      <h1>Looks</h1>
      {isDataLoaded ? (
        <StickyContainer id="inhoud">
          <h1>Personaliseer deelnemer</h1>
          <CustomizerInputRow
            category="head"
            onChange={(val, category) => handleItemChange(val, category)}
          />
          <CustomizerInputRow
            category="body"
            onChange={(val, category) => handleItemChange(val, category)}
          />
          <CustomizerInputRow
            category="foot"
            onChange={(val, category) => handleItemChange(val, category)}
          />
          <PrimaryButton onClick={() => handleSave()}>Opslaan</PrimaryButton>
        </StickyContainer>
      ) : null}
      <SideNavigation />
    </>
  );
};

const StickyContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  height: 45vh;
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Looks;
