import React, { useCallback } from 'react';
import SideNavigation from '../../components/SideNavigation';
import firebase from '../../authentication/base';
import moment from 'moment';
import { useHistory } from 'react-router';

const NewMessage = () => {
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
            timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
            message: message.value
          });
        history.push('/messages');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <>
      <SideNavigation />
      <form onSubmit={handleAddMessage}>
        <textarea name="message" cols="80" rows="10" />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default NewMessage;
