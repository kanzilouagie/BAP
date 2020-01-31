import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import firebase from '../../authentication/base';
import moment from 'moment';
const ShareMessage = () => {
  const history = useHistory();
  const handleAddMessage = useCallback(
    async event => {
      event.preventDefault();
      const { message } = event.target.elements;
      try {
        await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .collection('messages')
          .add({
            timestamp: moment().format("DD/MM/YYYY HH:mm:ss"),
            message: message.value
          });
        history.push('/step4');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  return (
    <>
      <h1>ShareMessage</h1>
      <form onSubmit={handleAddMessage}>
        <textarea cols="70" rows="10" name="message" />
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default ShareMessage;
