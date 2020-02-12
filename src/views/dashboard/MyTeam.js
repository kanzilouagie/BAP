import React from 'react';
import SideNavigation from '../../components/SideNavigation';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import { useHistory } from 'react-router';

const MyTeam = () => {
  const history = useHistory();
  return (
    <>
      <SideNavigation />{' '}
      <Overlay>
        <PrimaryButton
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
          active={true}
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

export default MyTeam;

const Overlay = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  width: 690px;
  height: 90vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;
