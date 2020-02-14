import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import logo from '../../assets/images/logo_think_pink.png';
import { StoreContext } from '../../store/StoreProvider';
import globals from '../../three/globals';
import DashBoardScene from '../../three/scenes/OnboardingScene.js';
import Button from '../../components/Button';
import CustomizerInputRow from '../../components/CustomizerInputRow';
import gsap from 'gsap';

const CustomizeRunner = () => {
  const history = useHistory();
  globals.history = history;

  const store = useContext(StoreContext);

  const handleItemChange = (val, category) => {
    globals.character[category] = val;
    globals.currentScene.changeLook(); // update
  };

  useEffect(() => {
    if (!store.isOnboardingLoaded) {
      gsap.set(document.getElementById('inhoud'), { opacity: 0 });
      globals.currentScene = new DashBoardScene();
      store.setIsOnboardingLoaded(true);
      setTimeout(() => {
        gsap.to(document.getElementById('inhoud'), 0.5, { opacity: 1 });
      }, 800);
    }
  }, [store]);

  useEffect(() => {
    return () => {
      globals.currentScene.scene.dispose();
      store.setIsOnboardingLoaded(false);
      globals.currentScene = null;
    };
  }, [history]);

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
        <Button border="#343988" onClick={() => history.push('/step2')}>
          Terug
        </Button>
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
            <StickyContainer id="inhoud">
              <Container>
                <CustomizerInputRow
                  category="head"
                  onChange={(val, category) => handleItemChange(val, category)}
                />
                <CustomizerInputRow
                  category="body"
                  onChange={(val, category) => handleItemChange(val, category)}
                  f
                />
                <CustomizerInputRow
                  category="foot"
                  onChange={(val, category) => handleItemChange(val, category)}
                />
              </Container>
            </StickyContainer>
            <div>
              <Button
                width="20rem"
                color="#FF9FAA"
                onClick={() => history.push('/step4')}
              >
                Volgende
              </Button>
            </div>
          </Choices>
        </Steps>
      </HomeBody>
    </Background>
  );
};

export default CustomizeRunner;

const StickyContainer = styled.div`
  position: absolute;
  top: -44rem;
  left: -22rem;
  color: white;
  height: 35vh;
  width: 35vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  & > div + div {
    margin-top: 2rem;
  }
`;

const Background = styled.div`
  position: relative;
  z-index: -1;
  width: 100%;
  height: 100vh;
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
    text-align: center;
    line-height: 3.8rem;
  }

  p {
    text-align: center;
    margin-bottom: 3rem;
  }
`;

const Choices = styled.div`
  position: absolute;
  bottom: 5rem;
`;
