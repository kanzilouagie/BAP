import React, { useEffect, useContext } from 'react';
import SideNavigation from '../../components/SideNavigation';
import globals from '../../three/globals';
import { useHistory } from 'react-router';
import OverviewScene from '../../three/scenes/OverviewScene';
import { StoreContext } from '../../store/StoreProvider';
import gsap from 'gsap';
import styled from 'styled-components';
import Button from '../../components/Button';
import buttons from '../../assets/images/buttons-arrow.svg';

const Overview = () => {
  const store = useContext(StoreContext);
  const history = useHistory();
  globals.history = history;

  useEffect(() => {
    if (!store.isOverviewLoaded) {
      gsap.to(globals.camera.rotation, 0.25, { x: -1 });
      setTimeout(() => {
        globals.currentScene = new OverviewScene();
      }, 250);
      store.setIsOverviewLoaded(true);
    }
  }, [store]);

  useEffect(() => {
    gsap.set(document.getElementById('preview'), { opacity: 0 });
    if (store.isFirstTime) {
      gsap.to(document.getElementById('preview'), 0.5, { opacity: 1 });
      setTimeout(() => {
        gsap.to(document.getElementById('preview'), 0.5, { opacity: 0 });
      }, 6000);
      store.setIsFirstTime(false);
    }
    return () => {
      if (
        !history.location.pathname.includes('/detail') &&
        !history.location.pathname.includes('/newmessage') &&
        !history.location.pathname.includes('/team')
      ) {
        store.setIsOverviewLoaded(false);
        globals.currentScene.scene.dispose();
      }
    };
  }, [history]);
  return (
    <>
      <SideNavigation />
      <Buttons id="preview">
        <img src={buttons} alt="controls" />
      </Buttons>
      <Overlay>
        <Button color="#FF9FAA" active onClick={() => history.push('/')}>
          Bericht lezen
        </Button>
        <Button color="#FF9FAA" onClick={() => history.push('/newmessage')}>
          Bericht plaatsen
        </Button>
        <Button
          style={{ fontSize: '2rem' }}
          color="#FF9FAA"
          onClick={() => history.push('/myteam')}
        >
          Mijn team
        </Button>
      </Overlay>
    </>
  );
};

export default Overview;

const Buttons = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20rem;

  img {
    width: 21rem;
    height: auto;
  }
`;

const Overlay = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  width: 690px;
  height: 90vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;
