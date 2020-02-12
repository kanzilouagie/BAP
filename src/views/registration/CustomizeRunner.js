import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import logo from '../../assets/images/logo_think_pink.png';
import { FacebookIcon, TwitterIcon } from 'react-share';

const CustomizeRunner = () => {
  const history = useHistory();

  return (
    <Background>
      <TopNavigation>
        <img src={logo} />
        <RightNav>
          <PrimaryButton height={'50px'} width={'auto'} padding={'0 20px'}>
            ?
          </PrimaryButton>
        </RightNav>
      </TopNavigation>
      <HomeBody>
        <SecondaryButton
          onClick={() => history.push('/step2')}
          height={'30px'}
          width={'auto'}
          padding={'0 10px'}
          style={{
            fontSize: '16px',
            marginBottom: '2rem',
            position: 'relative'
          }}
        >
          Terug
        </SecondaryButton>
        <h2>STAP 3/5</h2>
        <Steps>
          <h1>
            Deelnemer gekozen? <br />
            Tijd voor een leuke outfit te kiezen.
          </h1>
          <p>
            Net zoals elke borst, ben jij uniek!
            <br /> Personaliseer jouw deelnemer naar de stijl die jij wilt.
          </p>
          <Choices>
            <div>
              <div>hier komt een image</div>
              <PrimaryButton
                height={'50px'}
                width={'auto'}
                padding={'0 20px'}
                onClick={() => history.push('/step4')}
              >
                Volgende
              </PrimaryButton>
            </div>
          </Choices>
        </Steps>
      </HomeBody>
    </Background>
  );
};

export default CustomizeRunner;

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
  top: -60px;
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
    text-align: center;
    line-height: 3.8rem;
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
