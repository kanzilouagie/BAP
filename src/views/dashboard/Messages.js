import React, { useEffect, useState } from 'react';
import SideNavigation from '../../components/SideNavigation';
import MessageBlock from '../../components/MessageBlock';
import RepostBlock from '../../components/RepostBlock';
import styled from 'styled-components';
import { loadMessages } from './store/index';
import firebase from 'firebase';

const MessagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div:first-child {
    width: '50%';
  }
`;

const Messages = () => {
  const [messagesData, setMessagesData] = useState();

  useEffect(() => {
    loadMessages(firebase.auth().currentUser.uid).then(r => setMessagesData(r));
  }, []);

  return (
    <>
      <SideNavigation />
      <MessagesWrapper>
        {messagesData != null
          ? messagesData.forEach(element => {
              console.log(element['message']);
              return <p>{element['message']}</p>;
            })
          : null}
        <MessageBlock />
        <RepostBlock />
      </MessagesWrapper>
    </>
  );
};

export default Messages;
