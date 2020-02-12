import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import firebase from '../../authentication/base';
import { StoreContext } from '../../store/StoreProvider';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import logo from '../../assets/images/logo_think_pink.png';

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
          onClick={() => history.push('/step1')}
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
        <h2>STAP 2/5</h2>
        <Steps>
          <ImageDiv>
            <p>Hier komt een image</p>
          </ImageDiv>
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
              <SubmitButton
                style={{ alignSelf: 'flex-end' }}
                height={'50px'}
                width={'auto'}
                padding={'0 20px'}
                type="submit"
              >
                We zijn er bijna
              </SubmitButton>
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

const Steps = styled.div`
  position: relative;
  top: -60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
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

const ImageDiv = styled.div``;

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

const SubmitButton = styled.button`
  cursor: pointer;
  text-shadow: 0 -2px 0 #ff3353, 0 1px 1px #fff;
  box-sizing: border-box;
  font-size: 1em;
  font-family: Helvetica, Arial, Sans-Serif;
  text-decoration: none;
  font-weight: bold;
  color: #ff667e;
  height: ${props => props.height || '40px'};
  line-height: ${props => props.height || '40px'};
  display: inline-block;
  width: ${props => props.width || '40px'};
  background: linear-gradient(to bottom, #ffe6ea 0%, #ffd6dd 26%, #ff99a9 100%);
  padding: ${props => props.padding || '40px'};
  border-radius: 5px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  top: 0;
  transition: all 0.06s ease-out;
  position: relative;

  &:visited {
    color: #ff667e;
  }
  &:hover {
    background: linear-gradient(
      to bottom,
      #fff0f2 0%,
      #ffe0e5 26%,
      #ffa3b2 100%
    );
  }
  &:active {
    top: 6px;
    text-shadow: 0 -2px 0 #ff99a9, 0 1px 1px #fff, 0 0 4px white;
    color: #ffb3bf;
  }
  &:active:before {
    top: 0;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
  }
  &:before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
    top: 6px;
    border-radius: 5px;
    height: ${props => props.height || '38px'};
    background: linear-gradient(to top, #cc0020 0%, #ff1a3e 6px);
    transition: all 0.078s ease-out;
    box-shadow: 0 1px 0 2px rgba(0, 0, 0, 0.3), 0 5px 2.4px rgba(0, 0, 0, 0.5),
      0 10.8px 9px rgba(0, 0, 0, 0.2);
  }
`;
