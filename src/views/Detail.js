import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { getScene } from '../three/store';
import { loadDetailView, exitDetailView } from '../three/detailView';
import firebase from '../authentication/base';

const Detail = () => {
  const { id } = useParams();
  const [model, setModel] = useState();
  const [userData, setUserData] = useState();
  const history = useHistory();

  useEffect(() => {
    const scene = getScene();
    if (scene) {
      const object = scene.getObjectById(parseInt(id), true);
      setModel(object);
      loadDetailView(object);
    }
  }, [id]);

  useEffect(() => {
    if (model) {
      loadDetailView(model);
    }
  }, [model]);

  useEffect(() => {
    if (model) {
      const loadUserData = async () => {
        const userDataSnapshot = await firebase
          .firestore()
          .collection('users')
          .doc(model.userId)
          .get();
        setUserData(userDataSnapshot.data());
      };
      loadUserData();
    }
  }, [model]);

  const handleExit = () => {
    exitDetailView();
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
