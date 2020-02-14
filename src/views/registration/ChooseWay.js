import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import logo from '../../assets/images/logo-think-pink-Europe.svg';
import { FacebookIcon, TwitterIcon } from 'react-share';
import Button from '../../components/Button';
import runner from '../../assets/images/runner.png';
import walker from '../../assets/images/walker.png';

const ChooseWay = () => {
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
          onClick={() => history.push('/home')}
        >
          Terug
        </Button>
        <h2>STAP 1/5</h2>
        <Steps>
          <h1>Wandelen of toch liever lopen?</h1>
          <p>
            Net zoals op Race for the Cure kan je kiezen om te wandelen of te
            lopen. <br />
            Waar heb jij zin in?
          </p>
          <Choices>
            <div>
              <img src={runner} />
              <Button
                width="20rem"
                onClick={() => history.push('/step2')}
                color="#FF9FAA"
              >
                hup, wandelen
              </Button>
            </div>
            <div>
              <img src={walker} />
              <Button
                width="20rem"
                onClick={() => history.push('/step2')}
                color="#FF9FAA"
              >
                hup, lopen
              </Button>
            </div>
          </Choices>
        </Steps>
      </HomeBody>
    </Background>
  );
};

export default ChooseWay;

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
  position: relative;
  top: -10rem;
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
  justify-content: space-around;
  align-items: center;
  width: 70vw;
  height: auto;

  & img {
    height: 30rem;
    width: auto;
    margin-bottom: 2rem;
    margin-top: 3rem;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & div {
      background: #fd7b7c;
      width: 400px;
      height: 300px;
      margin-bottom: 3rem;
    }
  }
`;
