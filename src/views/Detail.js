import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import firebase from '../authentication/base';
import styled from 'styled-components';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { loadMessages } from '../views/dashboard/store/index';
import walker from '../assets/images/walker.png';
import Button from '../components/Button';

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
      <PopupWrapper>
        <div style={{ position: 'absolute', right: 20, top: 20 }}>
          <Button
            style={{
              fontWeight: 'bold'
            }}
            border="#343988"
            width="5rem"
            onClick={() => handleExit()}
          >
            x
          </Button>
        </div>
        <PopupLeft>
          <img src={walker} alt="walker" />
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
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}
              >
                {messagesData[0].title}
              </h2>
            ) : null}
            {messagesData.length > 0 ? (
              <DetailText>{messagesData[0].message}</DetailText>
            ) : null}
            {userData ? (
              <div>
                <Button color="#FF9FAA">
                  Ik loop voor {userData.username || ''}!
                </Button>

                <Button
                  style={{
                    fontSize: '1.6rem',
                    width: '4rem',
                    height: '4rem',
                    marginLeft: '1rem'
                  }}
                  color="#FF9FAA"
                  border="#E86565"
                  width="5rem"
                >
                  ?
                </Button>
              </div>
            ) : null}
          </DetailBody>
          <SocialMediaButtons>
            <Button color="#343988">
              <FacebookIcon
                width={'40px'}
                height={'40px'}
                bgStyle={{ fill: 'none' }}
              />
            </Button>
            <Button color="#343988">
              <TwitterIcon
                width={'40px'}
                height={'40px'}
                bgStyle={{ fill: 'none' }}
              />
            </Button>
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

  & img {
    width: 100%;
  }
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 2.8rem;
`;

const SocialMediaButtons = styled.div`
  width: 18rem;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
`;
