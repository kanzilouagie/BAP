import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { getScene } from '../three/store';
import { loadDetailView, exitDetailView } from '../three/detailView';
import firebase from '../authentication/base';
import MessageBlock from '../components/MessageBlock';
import { getUserWithId } from './dashboard/store';

const Detail = () => {
  const { id } = useParams();
  const [model, setModel] = useState();
  const [userData, setUserData] = useState([]);
  const [selectedUserInfo, setSelectedUserInfo] = useState([]);
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
          .collection('messages')
          .get();
        const tmpUserData = [];
        userDataSnapshot.forEach(post => {
          tmpUserData.push(post);
        });
        setUserData(tmpUserData);
        const user = await getUserWithId(model.userId);
        setSelectedUserInfo(user);
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
      <button onClick={() => handleExit()}>Terug</button>
      {userData.map(post => (
        <MessageBlock
          key={post.id}
          post={post.data()}
          userinfo={selectedUserInfo}
        />
      ))}
    </div>
  );
};

export default Detail;
