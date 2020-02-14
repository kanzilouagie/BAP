import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import firebase from '../../authentication/base';
import { StoreContext } from '../../store/StoreProvider';
import moment from 'moment';
import styled from 'styled-components';
import logo from '../../assets/images/logo-think-pink-Europe.svg';
import globals from '../../three/globals';
import IdleScene from '../../three/scenes/IdleScene';
import Button from '../../components/Button';

const PersonalInformation = () => {
  const store = useContext(StoreContext);

  const history = useHistory();
  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const { email, password, username, repeat } = event.target.elements;

      const checkEmailExist = await firebase
        .firestore()
        .collection('users')
        .where('email', '==', email.value)
        .get()
        .then(function(querySnapshot) {
          return querySnapshot.size;
        });

      const checkUsernameExist = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username.value)
        .get()
        .then(function(querySnapshot) {
          return querySnapshot.size;
        });

      if (repeat.value === password.value) {
        console.log('passwords match');
      } else {
        console.log("passwords don't match");
        return;
      }

      if (checkEmailExist === 0) {
        console.log('email bestaat nog niet');
      } else {
        console.log('email bestaat al');
        return;
      }

      if (checkUsernameExist === 0) {
        console.log('username bestaat nog niet');
        try {
          const authResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
          firebase
            .firestore()
            .collection('users')
            .doc(authResult.user.uid)
            .set({
              username: username.value,
              email: email.value,
              character: globals.character
            });
          firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection('messages')
            .add({
              timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
              subject: store.userInfo.subject,
              message: store.userInfo.message
            });
          history.push('/');
        } catch (error) {
          alert(error);
        }
      } else {
        console.log('username bestaat al');
        return;
      }
    },
    [history, store]
  );

  useEffect(() => {
    if (!store.isIdleLoaded) {
      globals.currentScene = new IdleScene();
      store.setIsIdleLoaded(true);
    }
  }, [store]);

  useEffect(() => {
    return () => {
      if (!history.location.pathname.includes('step4')) {
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
        <Button border="#343988" onClick={() => history.push('/step4')}>
          Terug
        </Button>
        <h2>STAP 5/5</h2>
        <Steps>
          <FormDiv>
            <h1>Samen zijn we sterk, laat je horen!</h1>
            <p>
              In ruil voor jouw gegevens (die we enkel gebruiken om je aan te
              melden) kan je op ons platform: geweldige, ontroerende en
              inspirerende mensen leren kennen.
            </p>
            <form onSubmit={handleSubmit}>
              <label>Gebruikersnaam</label>
              <input name="username" type="text" placeholder="johnsmith12" />
              <label>E-mailadres</label>
              <input name="email" type="email" placeholder="example@info.be" />
              <label>Kies een wachtwoord</label>
              <input
                name="password"
                type="password"
                placeholder="Wat is je wachtwoord?"
              />
              <label>Herhaal je wachtwoord</label>
              <input
                name="repeat"
                type="password"
                placeholder="Wat is je wachtwoord?"
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

export default PersonalInformation;

const Background = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100vh;
  /* background: #ffdde1; */
`;

const HomeBody = styled.div`
  padding: 0 15rem 0 40px;

  & > button {
    z-index: 2;
  }

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
  position: relative;
  top: -10rem;
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
  width: 700px;

  & form {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 700px;
  }

  & label {
    color: #ef534f;
    padding-bottom: 6px;
  }

  & p {
    width: 500px;
    margin-bottom: 1rem;
    font-size: 18px;
  }

  & input {
    box-sizing: border-box;
    margin-bottom: 1rem;
    background: none;
    border: 2px solid black;
    padding: 1rem;
    width: 100%;
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
