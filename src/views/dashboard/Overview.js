import React, { useEffect, useContext } from 'react';
import SideNavigation from '../../components/SideNavigation';
import globals from '../../three/globals';
import { useHistory } from 'react-router';
import OverviewScene from '../../three/scenes/OverviewScene';
import { StoreContext } from '../../store/StoreProvider';
import gsap from 'gsap';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import Button from '../../components/Button';

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
    return () => {
      console.log(history.location.pathname);
      if (
        !history.location.pathname.includes('/detail') &&
        !history.location.pathname.includes('/newmessage')
      ) {
        store.setIsOverviewLoaded(false);
        globals.currentScene.scene.dispose();
      }
    };
  }, [history]);
  return (
    <>
      <SideNavigation />
      <Overlay>
        <Button color="#FF9FAA" active onClick={() => history.push('/')}>
          Bericht lezen
        </Button>
        <Button color="#FF9FAA" onClick={() => history.push('/newmessage')}>
          Bericht plaatsen
        </Button>
        <Button color="#FF9FAA" onClick={() => history.push('/myteam')}>
          Mijn team
        </Button>
      </Overlay>
    </>
  );
};

export default Overview;

const Overlay = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  width: 690px;
  height: 90vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;
