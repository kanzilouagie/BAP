import React, { useContext, useEffect } from 'react';
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
import Button from './Button';

const ProfileWrapper = ({ children }) => {
  const store = useContext(StoreContext);
  const history = useHistory();

  useEffect(() => {
    if (!store.isProfileLoaded) {
      gsap.set(document.getElementById('inhoud'), { opacity: 0 });
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
          setTimeout(() => {
            gsap.to(document.getElementById('inhoud'), 0.5, {
              opacity: 1
            });
          }, 700);
          if (lookData.character) globals.character = lookData.character;
          globals.currentScene.changeLook(); // update
          // this.skinInstance.setAnimation('Run');
        };
        setCharacterLook();
      }, 600);
    }
  }, [store]);

  useEffect(() => {
    if (
      history.location.pathname.includes('/profile') &&
      store.isProfileLoaded
    ) {
      gsap.set(document.getElementById('inhoud'), { opacity: 0 });
      gsap.to(document.getElementById('inhoud'), 0.5, { opacity: 1 });
    }
    if (globals.currentScene.historyUpdate)
      globals.currentScene.historyUpdate();
    return () => {
      if (!history.location.pathname.includes('/profile')) {
        gsap.set(document.getElementById('inhoud'), { opacity: 0 });
        globals.currentScene.scene.dispose();
        store.setIsProfileLoaded(false);
      }
    };
  }, [history]);

  const handleExit = path => {
    if (path !== history.location.pathname) {
      gsap.to(document.getElementById('inhoud'), 0.3, { opacity: 0 });
    }

    history.push(path);
  };

  return (
    <Container>
      <SideNavigation />
      <StickyContainer id="inhoud">{children}</StickyContainer>
      <ProfileNav id="profile-nav">
        <Button
          border="#343988"
          width="20rem"
          active={history.location.pathname === '/profile/info'}
          onClick={() => handleExit('/profile/info')}
        >
          mijn gegevens
        </Button>

        <Button
          border="#343988"
          width="20rem"
          active={history.location.pathname === '/profile/looks'}
          onClick={() => handleExit('/profile/looks')}
        >
          personaliseren
        </Button>

        <Button
          border="#343988"
          width="20rem"
          active={history.location.pathname === '/profile/messages'}
          onClick={() => handleExit('/profile/looks')}
        >
          mijn berichten
        </Button>

        <Button
          border="#343988"
          width="20rem"
          active={history.location.pathname === '/profile/supporters'}
          onClick={() => handleExit('/profile/looks')}
        >
          ik loop voor
        </Button>
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
  top: 22rem;
  left: 67.5rem;
  color: white;
  height: 55vh;
  width: 53vh;
`;

const ProfileNav = styled.nav`
  width: 102vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 6rem;
`;

ProfileWrapper.propTypes = {
  children: node.isRequired
};

export default ProfileWrapper;
