import React, { useEffect } from 'react';

import firebase from '../../authentication/base';
import ProfileWrapper from '../../components/ProfileWrapper';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

const Info = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const data = await (
        await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
      ).data();
      setUserData(data);
    };
    getUserData();
  }, []);

  return (
    <ProfileWrapper>
      <Container>
        <h1>Mijn gegevens</h1>
        <Form>
          <fieldset>
            <label>Gebruikersnaam</label>
            <input
              type="text"
              name="username"
              placeholder={userData.username || ''}
            />
          </fieldset>
          <fieldset>
            <label>E-mailadres</label>
            <input
              type="email"
              name="email"
              placeholder={userData.email || 'example@example.com'}
            />
          </fieldset>
          <fieldset>
            <label>Verander wachtwoord</label>
            <input type="password" name="password" />
          </fieldset>
          <Button onClick={e => e.preventDefault()} border="#343988">
            gegevens opslaan
          </Button>
        </Form>
      </Container>
    </ProfileWrapper>
  );
};

const Container = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: start;
  margin-left: 3rem;

  & h1 {
    margin-bottom: 2rem;
    margin-top: 2rem;
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const Form = styled.form`
  & fieldset {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
  }

  & label {
    margin-bottom: 0.5rem;
  }

  & input {
    background: none;
    border: 0.2rem solid black;
    padding: 0.5rem 1rem;
    width: 30rem;
    color: black;
    border-radius: 10px;

    &::placeholder {
      color: black;
    }
  }

  & button {
    margin-top: 3rem;
  }
`;

export default Info;
