import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import firebase from '../authentication/base';
import styled from 'styled-components';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { loadMessages } from '../views/dashboard/store/index';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const Detail = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [messagesData, setMessagesData] = useState([]);
  const history = useHistory();

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
    history.push('/');
  };

  return (
    <>
      <FadedWrapper></FadedWrapper>
      <DarkWrapper></DarkWrapper>
      <SecondaryButton onClick={() => handleExit()}>x</SecondaryButton>
      <PopupWrapper>
        <PopupLeft>
          <p>test</p>
        </PopupLeft>

        <PopupRight>
          {userData ? (
            <DetailTitle>{userData.username || ''}'s verhaal.</DetailTitle>
          ) : null}
          <DetailBody>
            {messagesData.length > 0 ? (
              <h2
                style={{
                  color: '#405B8E',
                  fontSize: '30px',
                  fontWeight: 'bold'
                }}
              >
                {messagesData[0].title}
              </h2>
            ) : null}
            {messagesData.length > 0 ? (
              <DetailText>{messagesData[0].message}</DetailText>
            ) : null}
            {userData ? (
              <PrimaryButton width={'auto'} height={'40px'} padding={'0 20px'}>
                Ik loop voor {userData.username || ''}!
              </PrimaryButton>
            ) : null}
          </DetailBody>
          <SocialMediaButtons>
            <SecondaryButton>
              <FacebookIcon
                width={'40px'}
                height={'40px'}
                bgStyle={{ fill: 'none' }}
              />
            </SecondaryButton>
            <SecondaryButton>
              <TwitterIcon
                width={'40px'}
                height={'40px'}
                bgStyle={{ fill: 'none' }}
              />
            </SecondaryButton>
          </SocialMediaButtons>
        </PopupRight>
      </PopupWrapper>
    </>
  );
};

export default Detail;

const FadedWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(10px);
`;

const DarkWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.4;
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vh;
  background: #f69796;
  border-radius: 30px;
`;

const PopupLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  height: 100%;
  background-color: #f69796;
  border-radius: 30px;
`;

const PopupRight = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex: 3;
  height: 100%;
  padding: 100px 40px;
  background-color: #ffdde1;
  z-index: -1000;
  border-radius: 30px;
`;

const DetailBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 3;
`;

const DetailTitle = styled.h1`
  color: #e86565;
  font-size: 35px;
  text-transform: capitalize;
  font-weight: bold;
  align-self: start;
  flex: 1;
`;

const DetailText = styled.p`
  font-size: 16px;
  line-height: 2.8rem;
`;

const SocialMediaButtons = styled.div`
  width: 100px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
`;
