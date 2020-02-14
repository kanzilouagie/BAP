import React, { useCallback, useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import app from '../authentication/base';
import styled from 'styled-components';
import Button from '../components/Button';
import SecondaryButton from '../components/SecondaryButton';
import logo from '../assets/images/logo_think_pink.png';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { AuthContext } from '../authentication/Auth';
import SideNavigation from '../components/SideNavigation';

const Home = () => {
  const history = useHistory();

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <SideNavigation />
      <Background>
        <TopNavigation>
          <img src={logo} />
        </TopNavigation>
        <HomeBody>
          <h1>Verhalen delen, elkaar inspireren.</h1>
          <h2>Een campagne in samenwerking met Race for the Cure</h2>
          <p>
            500.000 mensen in Europa krijgen jaarlijks borstkanker.
            <br /> Hiermee willen wij bewustzijn creëren door mensen de
            doelstelling te geven om samen met 500.000 mensen doorheen Europa
            deel te nemen aan #CheckMijnBorst. <br />
            Je creëert je eigen deelnemer en kan rondlopen en andere deelnemers
            ontmoeten. Elke deelnemer vertegenwoordigt een inspirerend verhaal
            en/of motiverende woorden. Als we onze verhalen delen, inspireren we
            mekaar om samen tegen borstkanker te vechten.
          </p>
        </HomeBody>
        <BottomNavigation>
          <LeftBottomNav>
            <Button color="#FF9FAA" onClick={() => history.push('/step1')}>
              Ik wil meedoen
            </Button>
            <Button border="#343988">Hoe werkt het?</Button>
          </LeftBottomNav>
          <RightBottomNav>
            <SocialMediaButtons>
              <Button border="#343988">
                <FacebookIcon
                  size={40}
                  iconFillColor={'#343988'}
                  bgStyle={{ fill: 'none' }}
                />
              </Button>
              <Button border="#343988">
                <TwitterIcon
                  size={40}
                  iconFillColor={'#343988'}
                  bgStyle={{ fill: 'none' }}
                />
              </Button>
            </SocialMediaButtons>
          </RightBottomNav>
        </BottomNavigation>
      </Background>
    </>
  );
};

export default Home;

const Background = styled.div`
  position: absolute;
  z-index: -1001;
  width: 100%;
  height: 100vh;
  background: #ffdde1;
`;

const HomeBody = styled.div`
  padding: 0 40px;

  h1 {
    line-height: 6rem;
    width: 500px;
    font-size: 60px;
    font-weight: bold;
    color: #e86565;
    margin-bottom: 5rem;
  }

  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #e86565;
    margin-bottom: 2rem;
  }

  p {
    font-size: 18px;
    width: 735px;
  }
`;

const BottomNavigation = styled.footer`
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px;
`;

const LeftBottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 320px;
  height: auto;
`;

const RightBottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TopNavigation = styled.nav`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const SocialMediaButtons = styled.div`
  width: 170px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
`;
