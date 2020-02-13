import React, { useEffect, useContext } from 'react';
import SideNavigation from '../../components/SideNavigation';
import globals from '../../three/globals';
import { useHistory } from 'react-router';
import OverviewScene from '../../three/scenes/OverviewScene';
import { StoreContext } from '../../store/StoreProvider';
import gsap from 'gsap';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';

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
        <PrimaryButton
          active={true}
          height={'50px'}
          width={'auto'}
          padding={'0 20px'}
          style={{ fontSize: '16px' }}
          onClick={() => history.push('/')}
        >
          Bericht lezen
        </PrimaryButton>
        <PrimaryButton
          height={'50px'}
          width={'auto'}
          padding={'0 20px'}
          style={{ fontSize: '16px' }}
          onClick={() => history.push('/newmessage')}
        >
          Bericht plaatsen
        </PrimaryButton>
        <PrimaryButton
          height={'50px'}
          width={'auto'}
          padding={'0 20px'}
          style={{ fontSize: '16px' }}
          onClick={() => history.push('/myteam')}
        >
          Mijn team
        </PrimaryButton>
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
