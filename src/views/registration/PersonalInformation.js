import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import firebase from '../../authentication/base';

const PersonalInformation = () => {
  const history = useHistory();
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password, username, repeat } = event.target.elements;
      if (repeat.value === password.value) {
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
              email: email.value
            });
          history.push('/step4');
        } catch (error) {
          alert(error);
        }
      } else {
        alert("passwords don't match");
      }
    },
    [history]
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
