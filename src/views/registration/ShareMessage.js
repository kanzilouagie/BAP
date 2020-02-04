import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import firebase from '../../authentication/base';
import { StoreContext } from '../../store/StoreProvider';
import moment from 'moment';
const ShareMessage = () => {
  const history = useHistory();
  const store = useContext(StoreContext);
  const handleAddMessage = useCallback(
    async event => {
      event.preventDefault();
      const { message } = event.target.elements;
      try {
        const authResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            store.userInfo.email,
            store.userInfo.password
          );
        firebase
          .firestore()
          .collection('users')
          .doc(authResult.user.uid)
          .set({
            username: store.userInfo.username,
            email: store.userInfo.email
          });
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .collection('messages')
          .add({
            timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
            message: message.value
          });
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [store, history]
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
