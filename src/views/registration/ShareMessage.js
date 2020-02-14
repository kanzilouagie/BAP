import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';
import styled from 'styled-components';
import logo from '../../assets/images/logo-think-pink-Europe.svg';
import IdleScene from '../../three/scenes/IdleScene';
import globals from '../../three/globals';
import Button from '../../components/Button';

const ShareMessage = () => {
  const history = useHistory();
  const store = useContext(StoreContext);
  const handleAddMessage = useCallback(
    async event => {
      event.preventDefault();
      const { subject, message } = event.target.elements;

      if (subject.value.length > 5) {
        store.addUserInfo('subject', subject.value);
      } else {
        console.log('Onderwerp moet meer dan 5 karakters bevatten.');
        return;
      }

      if (message.value.length > 5) {
        store.addUserInfo('message', message.value);
      } else {
        console.log('Bericht moet meer dan 5 karakters bevatten');
        return;
      }
      history.push('/step5');
    },
    [store, history]
  );

  useEffect(() => {
    if (!store.isIdleLoaded) {
      globals.currentScene = new IdleScene();
      store.setIsIdleLoaded(true);
    }
  }, [store]);

  useEffect(() => {
    return () => {
      if (!history.location.pathname.includes('step5')) {
        globals.currentScene.scene.dispose();
        store.setIsIdleLoaded(false);
        globals.currentScene = null;
      }
    };
  }, [history]);
  return (
    <Background>
      <TopNavigation>
        <img src={logo} alt="logo" />
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
          onClick={() => history.push('/step3')}
        >
          Terug
        </Button>
        <h2>STAP 4/5</h2>
        <Steps>
          <FormDiv>
            <h1>Samen zijn we sterk, laat je horen!</h1>
            <p>
              Deel je eigen verhaal of laat lotgenoten over heel Europa weten
              dat je hen steunt in hetgeen dat zij meemaken / meegemaakt hebben.
            </p>
            <form onSubmit={handleAddMessage}>
              <input
                type="text"
                name="subject"
                placeholder="Waarover gaat je bericht?"
              />
              <textarea
                cols="70"
                rows="10"
                name="message"
                placeholder="Schrijf hier jouw bericht en stuur hem de wereld in!"
              />
              <Button
                type="submit"
                color="#FF9FAA"
                style={{ alignSelf: 'flex-end' }}
              >
                We zijn er bijna
              </Button>
            </form>
          </FormDiv>
        </Steps>
      </HomeBody>
    </Background>
  );
};

export default ShareMessage;

const Background = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100vh;
  /* background: #ffdde1; */
`;

const HomeBody = styled.div`
  padding: 0 15rem 0 40px;

  h2 {
    position: relative;
    font-size: 20px;
    font-weight: bold;
    color: #343988;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
`;

const Steps = styled.div`
  margin-top: -10rem;
  margin-right: 20rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  h1 {
    font-size: 35px;
    font-weight: bold;
    color: #e86565;
    margin-bottom: 2rem;
    line-height: 3.8rem;
    width: 500px;
  }
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  & p {
    width: 500px;
    margin-bottom: 2rem;
  }

  & input {
    margin-bottom: 2rem;
    background: none;
    border: 2px solid black;
    padding: 1rem;
    width: 300px;
    border-radius: 10px;
  }

  & textarea {
    margin-bottom: 2rem;
    padding: 1rem;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
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
