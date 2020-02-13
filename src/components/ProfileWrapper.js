import React, { useContext, useEffect, useState } from 'react';
import SideNavigation from './SideNavigation';
import globals from '../three/globals';
import ProfileScene from '../three/scenes/ProfileScene';
import { StoreContext } from '../store/StoreProvider';
import { useHistory } from 'react-router';
import gsap from 'gsap';
import styled from 'styled-components';
import { Power1 } from 'gsap/gsap-core';
import firebase from '../authentication/base';
import { node } from 'prop-types';

const ProfileWrapper = ({ children }) => {
  const store = useContext(StoreContext);
  const history = useHistory();
  const [isDataLoaded, setIsDataLoaded] = useState();

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
          if (lookData.character) globals.character = lookData.character;
          globals.currentScene.changeLook(); // update
          setIsDataLoaded(true);
          // this.skinInstance.setAnimation('Run');
        };
        setCharacterLook();
      }, 600);
    }
  }, [store]);

  useEffect(() => {
    gsap.set(document.getElementById('inhoud'), { opacity: 0.1 });
    gsap.to(document.getElementById('inhoud'), 0.5, { opacity: 1 });
    if (globals.currentScene.historyUpdate)
      globals.currentScene.historyUpdate();
    return () => {
      if (!history.location.pathname.includes('/profile')) {
        globals.currentScene.scene.dispose();
        store.setIsProfileLoaded(false);
      }
    };
  }, [history]);

  const handleExit = path => {
    if (path !== history.location.pathname) {
      gsap.to(document.getElementById('inhoud'), 0.3, { opacity: 0 });
    }
    setTimeout(() => {
      history.push(path);
    }, 500);
  };

  return (
    <Container>
      <SideNavigation />

      <StickyContainer id="inhoud">{children}</StickyContainer>
      <ProfileNav>
        <ul>
          <li>
            <a onClick={() => handleExit('/profile/info')}>mijn gegevens</a>
          </li>
          <li>
            <a onClick={() => handleExit('/profile/looks')}>personaliseren</a>
          </li>
          <li>
            <a onClick={() => handleExit('/profile/looks')}>mijn berichten</a>
          </li>
          <li>
            <a onClick={() => handleExit('/profile/looks')}>ik loop voor</a>
          </li>
        </ul>
      </ProfileNav>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const StickyContainer = styled.div`
  position: absolute;
  top: 0rem;
  left: 0rem;
  color: white;
  height: 55vh;
  width: 53vh;
`;

const ProfileNav = styled.nav`
  & > ul {
    width: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 6rem;
  }

  & > a {
    cursor: pointer;
  }
`;

ProfileWrapper.propTypes = {
  children: node.isRequired
};

export default ProfileWrapper;
