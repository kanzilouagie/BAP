import React, { useEffect, useContext } from 'react';
import SideNavigation from '../../components/SideNavigation';
import { useHistory } from 'react-router';
import globals from '../../three/globals';
import loadThree from '../../three/setup';
import { StoreContext } from '../../store/StoreProvider';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';

const Overview = () => {
  // pass history to threejs scene
  const history = useHistory();
  globals.history = history;

  const store = useContext(StoreContext);

  useEffect(() => {
    if (!store.isWorldLoaded) {
      loadThree();
      store.setIsWorldLoaded(true);
    }
  }, [store]);
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
