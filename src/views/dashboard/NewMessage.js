import React, { useCallback } from 'react';
import SideNavigation from '../../components/SideNavigation';
import firebase from '../../authentication/base';
import moment from 'moment';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Button from '../../components/Button';
import runner from '../../assets/images/runner.png';

const NewMessage = () => {
  const history = useHistory();

  const handleAddMessage = useCallback(
    async event => {
      event.preventDefault();
      const { subject, message } = event.target.elements;

      if (subject.value.length > 5) {
        if (message.value.length > 5) {
          try {
            await firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .collection('messages')
              .add({
                timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
                subject: subject.value,
                message: message.value
              });
          } catch (error) {
            alert(error);
          }
        } else {
          console.log('Bericht moet meer dan 5 karakters bevatten');
          return;
        }
      } else {
        console.log('Onderwerp moet meer dan 5 karakters bevatten.');
        return;
      }
      history.push('/');
    },
    [history]
  );

  const handleExit = () => {
    history.push('/');
  };

  return (
    <>
      <FadedWrapper></FadedWrapper>
      <DarkWrapper></DarkWrapper>
      <PopupWrapper>
        <Button
          border="#343988"
          style={{ position: 'absolute', right: 20, top: 20 }}
          onClick={() => handleExit()}
        >
          x
        </Button>
        <PopupLeft>
          <img src={runner} alt="runner" />
        </PopupLeft>

        <PopupRight>
          <DetailTitle>
            Laat een positief berichtje na voor de lotgenoten.
          </DetailTitle>
          <DetailBody>
            <form onSubmit={handleAddMessage}>
              <input
                type="text"
                name="subject"
                placeholder="Waarover gaat jouw bericht?"
              />
              <textarea
                name="message"
                cols="80"
                rows="10"
                placeholder="Schrijf hier jouw bericht en stuur hem de wereld in!"
              />
              <Button
                style={{ alignSelf: 'flex-end' }}
                color="#FF9FAA"
                type="submit"
              >
                Bericht delen
              </Button>
            </form>
          </DetailBody>
        </PopupRight>
      </PopupWrapper>
      <SideNavigation />
    </>
  );
};

export default NewMessage;

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

  & form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  & input {
    margin-bottom: 2rem;
    background: none;
    border: 2px solid black;
    padding: 1rem;
    width: 300px;
    border-radius: 10px;
  }

  & textarea {
    margin-bottom: 2rem;
    padding: 1rem;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
  }
`;

const DetailTitle = styled.h1`
  color: #e86565;
  font-size: 35px;
  font-weight: bold;
  align-self: start;
  flex: 1;
`;
