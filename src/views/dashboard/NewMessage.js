import React, { useCallback } from 'react';
import SideNavigation from '../../components/SideNavigation';
import firebase from '../../authentication/base';
import moment from 'moment';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';

const NewMessage = () => {
  const history = useHistory();
  // const handleAddMessage = useCallback(
  //   async event => {
  //     event.preventDefault();
  //     const { message } = event.target.elements;
  //     try {
  //       await firebase
  //         .firestore()
  //         .collection('users')
  //         .doc(firebase.auth().currentUser.uid)
  //         .collection('messages')
  //         .add({
  //           timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
  //           message: message.value
  //         });
  //       history.push('/messages');
  //     } catch (error) {
  //       alert(error);
  //     }
  //   },
  //   [history]
  // );

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
        <SecondaryButton
          style={{ position: 'absolute', right: 20, top: 20, fontSize: '30px' }}
          width={'auto'}
          padding={'0 20px'}
          onClick={() => handleExit()}
        >
          x
        </SecondaryButton>
        <PopupLeft>
          <p>test</p>
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
              <SubmitButton
                style={{ alignSelf: 'flex-end' }}
                height={'50px'}
                width={'auto'}
                padding={'0 20px'}
                type="submit"
              >
                Bericht delen
              </SubmitButton>
            </form>
          </DetailBody>
        </PopupRight>
      </PopupWrapper>
      <SideNavigation />
    </>
  );
};

export default NewMessage;

const Overlay = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  width: 690px;
  height: 90vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;

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

const SubmitButton = styled.button`
  cursor: pointer;
  text-shadow: 0 -2px 0 #ff3353, 0 1px 1px #fff;
  box-sizing: border-box;
  font-size: 1em;
  font-family: Helvetica, Arial, Sans-Serif;
  text-decoration: none;
  font-weight: bold;
  color: #ff667e;
  height: ${props => props.height || '40px'};
  line-height: ${props => props.height || '40px'};
  display: inline-block;
  width: ${props => props.width || '40px'};
  background: linear-gradient(to bottom, #ffe6ea 0%, #ffd6dd 26%, #ff99a9 100%);
  padding: ${props => props.padding || '40px'};
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
    height: ${props => props.height || '38px'};
    background: linear-gradient(to top, #cc0020 0%, #ff1a3e 6px);
    transition: all 0.078s ease-out;
    box-shadow: 0 1px 0 2px rgba(0, 0, 0, 0.3), 0 5px 2.4px rgba(0, 0, 0, 0.5),
      0 10.8px 9px rgba(0, 0, 0, 0.2);
  }
`;
