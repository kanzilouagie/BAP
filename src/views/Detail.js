import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { getScene } from '../three/store';
import { loadDetailView, exitDetailView } from '../three/detailView';
import firebase from '../authentication/base';
import styled from 'styled-components';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { loadMessages } from '../views/dashboard/store/index';

const Detail = () => {
  const { id } = useParams();
  const [model, setModel] = useState();
  const [userData, setUserData] = useState();
  const [messagesData, setMessagesData] = useState([]);
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
    if (id) {
      const loadUserData = async () => {
        const userDataSnapshot = await firebase
          .firestore()
          .collection('users')
          .doc(id)
          .get();
        setUserData(userDataSnapshot.data());
      };
      loadUserData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadMessages(id).then(posts => setMessagesData(posts));
    }
  }, [id]);

  const handleExit = () => {
    exitDetailView();
    history.push('/');
  };

  return (
    <PopupWrapper>
      {userData ? (
        <DetailTitle>{userData.username || ''}'s verhaal.</DetailTitle>
      ) : null}
      {messagesData.length > 0 ? (
        <DetailBody>{messagesData[0].message}</DetailBody>
      ) : null}
      {userData ? (
        <PrimaryButton>Ik loop voor {userData.username || ''}!</PrimaryButton>
      ) : null}
      <SecondaryButton onClick={() => handleExit()}>x</SecondaryButton>
      <SecondaryButton>
        <FacebookIcon bgStyle={{ fill: 'none' }} />
      </SecondaryButton>
      <SecondaryButton>
        <TwitterIcon bgStyle={{ fill: 'none' }} />
      </SecondaryButton>
    </PopupWrapper>
  );
};

export default Detail;

const PopupWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vh;
  background: #f69796;
`;

const PrimaryButton = styled.a`
  cursor: pointer;
  margin-left: 5px;
  margin-bottom: 15px;
  text-shadow: 0 -2px 0 #ff3353, 0 1px 1px #fff;
  box-sizing: border-box;
  font-size: 2em;
  font-family: Helvetica, Arial, Sans-Serif;
  text-decoration: none;
  font-weight: bold;
  color: #ff667e;
  height: 65px;
  line-height: 65px;
  padding: 0 32.5px;
  display: inline-block;
  width: auto;
  background: linear-gradient(to bottom, #ffe6ea 0%, #ffd6dd 26%, #ff99a9 100%);
  border-radius: 5px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  top: 0;
  transition: all 0.06s ease-out;
  position: relative;

  &:visited {
    color: #ff667e;
  }
  &:hover {
    background: linear-gradient(
      to bottom,
      #fff0f2 0%,
      #ffe0e5 26%,
      #ffa3b2 100%
    );
  }
  &:active {
    top: 6px;
    text-shadow: 0 -2px 0 #ff99a9, 0 1px 1px #fff, 0 0 4px white;
    color: #ffb3bf;
  }
  &:active:before {
    top: 0;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
  }
  &:before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
    top: 6px;
    border-radius: 5px;
    height: 65px;
    background: linear-gradient(to top, #cc0020 0%, #ff1a3e 6px);
    transition: all 0.078s ease-out;
    box-shadow: 0 1px 0 2px rgba(0, 0, 0, 0.3), 0 5px 2.4px rgba(0, 0, 0, 0.5),
      0 10.8px 9px rgba(0, 0, 0, 0.2);
  }
`;

const SecondaryButton = styled.a`
cursor: pointer;
	 margin-left: 5px;
	 margin-bottom: 15px;
	 text-shadow: 0 -2px 0 #181a3e, 0 1px 1px #6066c2;
	 box-sizing: border-box;
	 font-size: 2em;
	 font-family: Helvetica, Arial, Sans-Serif;
	 text-decoration: none;
	 font-weight: bold;
	 color: #262a63;
	 height: 65px;
	 line-height: 65px;
	 padding: 0 32.5px;
	 display: inline-block;
	 width: auto;
	 background: linear-gradient(to bottom, #222ee6 0%, #323bc7 26%, #343988 100%);
	 border-radius: 5px;
	 border-top: 1px solid #676dc5;
	 border-bottom: 1px solid #6066c2;
	 top: 0;
	 transition: all 0.06s ease-out;
	 position: relative;
}
 &:visited {
	 color: #262a63;
}
 &:hover {
	 background: linear-gradient(to bottom, #2c37e7 0%, #3740cc 26%, #373c8f 100%);
}
 &:active {
	 top: 6px;
	 text-shadow: 0 -2px 0 #343988, 0 1px 1px #6066c2, 0 0 4px white;
	 color: #3b419a;
}
 &:active:before {
	 top: 0;
	 box-shadow: 0 3px 3px rgba(0, 0, 0, .7), 0 3px 9px rgba(0, 0, 0, .2);
}
 &:before {
	 display: inline-block;
	 content: '';
	 position: absolute;
	 left: 0;
	 right: 0;
	 z-index: -1;
	 top: 6px;
	 border-radius: 5px;
	 height: 65px;
	 background: linear-gradient(to top, #000 0%, #0e102f 6px);
	 transition: all 0.078s ease-out;
	 box-shadow: 0 1px 0 2px rgba(0, 0, 0, .3), 0 5px 2.4px rgba(0, 0, 0, .5), 0 10.8px 9px rgba(0, 0, 0, .2);
}
`;

const DetailTitle = styled.p`
  color: #e86565;
  font-size: 35px;
  text-transform: capitalize;
`;

const DetailBody = styled.p`
  font-size: 20px;
`;
