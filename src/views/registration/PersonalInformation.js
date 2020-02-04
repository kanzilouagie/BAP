import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import firebase from '../../authentication/base';
import { StoreContext } from '../../store/StoreProvider';

const PersonalInformation = () => {
  const store = useContext(StoreContext);

  const history = useHistory();
  const handleSignUp = useCallback(
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
        store.addUserInfo('username', username.value);
        store.addUserInfo('email', email.value);
        store.addUserInfo('password', password.value);
        history.push('/step4');
      } else {
        console.log('username bestaat al');
        return;
      }
    },
    [history, store]
  );

  return (
    <>
      <h1>PersonalInformation</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Gebruikersnaam
          <input name="username" type="text" placeholder="johnsmith12" />
        </label>
        <label>
          E-mailadres
          <input name="email" type="email" placeholder="example@info.be" />
        </label>
        <label>
          Kies een wachtwoord
          <input
            name="password"
            type="password"
            placeholder="Wat is je wachtwoord?"
          />
        </label>
        <label>
          Herhaal je wachtwoord
          <input
            name="repeat"
            type="password"
            placeholder="Wat is je wachtwoord?"
          />
        </label>
        <button type="submit">Step4</button>
      </form>
    </>
  );
};

export default PersonalInformation;
