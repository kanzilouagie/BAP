import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import logo from '../../assets/images/logo-think-pink-Europe.svg';
import { FacebookIcon, TwitterIcon } from 'react-share';
import Button from '../../components/Button';
import character1 from '../../assets/images/character1.png';
import character2 from '../../assets/images/character2.png';
import character3 from '../../assets/images/character3.png';

const ChooseRunner = () => {
  const history = useHistory();

  return (
    <Background>
      <TopNavigation>
        <img src={logo} />
        <RightNav>
          <Button color="#FF9FAA" border="#E86565" width="5rem">
            ?
          </Button>
        </RightNav>
      </TopNavigation>
      <HomeBody>
        <Button
          style={{ zIndex: 10 }}
          border="#343988"
          onClick={() => history.push('/step1')}
        >
          Terug
        </Button>
        <h2>STAP 2/5</h2>
        <Steps>
          <h1>Welke deelnemer kies jij?</h1>
          <p>
            Kies je digitale deelnemer, bij de volgende stap kan je hem helemaal
            naar jouw wensen personaliseren!
          </p>
          <Choices>
            <div>
              <img src={character1} />
              <Button
                width="20rem"
                onClick={() => history.push('/step3')}
                color="#FF9FAA"
              >
                kies mij!
              </Button>
            </div>
            <div>
              <img src={character2} />
              <Button
                width="20rem"
                onClick={() => history.push('/step3')}
                color="#FF9FAA"
              >
                nee, mij!
              </Button>
            </div>
            <div>
              <img src={character3} />
              <Button
                width="20rem"
                onClick={() => history.push('/step3')}
                color="#FF9FAA"
              >
                of mij?
              </Button>
            </div>
          </Choices>
        </Steps>
      </HomeBody>
    </Background>
  );
};

export default ChooseRunner;

const Background = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background: #ffdde1;
`;

const HomeBody = styled.div`
  padding: 0 40px;

  h2 {
    position: relative;
    font-size: 20px;
    font-weight: bold;
    color: #343988;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
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

const RightNav = styled.div`
  width: 187.05px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const Steps = styled.div`
  margin-top: -10rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-size: 35px;
    font-weight: bold;
    color: #e86565;
    margin-bottom: 2rem;
  }

  p {
    text-align: center;
    margin-bottom: 3rem;
  }
`;

const Choices = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: auto;

  & div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    & img {
      width: auto;
      height: 300px;
      margin-bottom: 3rem;
    }
  }
`;
