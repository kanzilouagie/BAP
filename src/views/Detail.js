import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import firebase from '../authentication/base';

const Detail = () => {
  const [userData, setUserData] = useState();
  const history = useHistory();

  // useEffect(() => {
  //   if (model) {
  //     const loadUserData = async () => {
  //       const userDataSnapshot = await firebase
  //         .firestore()
  //         .collection('users')
  //         .doc(model.userId)
  //         .get();
  //       setUserData(userDataSnapshot.data());
  //     };
  //     loadUserData();
  //   }
  // }, [model]);

  const handleExit = () => {
    history.push('/');
  };

  return (
    <div>
      {userData ? (
        <p>
          Dit is {userData.username || ''}. Deze gebruiker zijn email is{' '}
          {userData.email}.
        </p>
      ) : null}
      <button onClick={() => handleExit()}>Terug</button>
    </div>
  );
};

export default Detail;
