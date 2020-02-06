import React, { useEffect, useState } from 'react';
import SideNavigation from '../../components/SideNavigation';
import MessageBlock from '../../components/MessageBlock';
import RepostBlock from '../../components/RepostBlock';
import styled from 'styled-components';
import { loadMessages } from './store/index';
import firebase from 'firebase';

const MessagesWrapper = styled.div`
  width: 50%;
`;

const RepostsWrapper = styled.div`
  width: 50%;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
// setMessagesData(r)
const Messages = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    loadMessages(firebase.auth().currentUser.uid).then(posts => {
      setPosts(posts);
    });
  }, []);

  return (
    <>
      <SideNavigation />
      <MessageContainer>
        <MessagesWrapper>
          {posts.map(post => (
            <MessageBlock key={post.id} post={post.data()} />
          ))}
        </MessagesWrapper>
        <RepostsWrapper>
          {posts.map(post => (
            <MessageBlock key={post.id} post={post.data()} />
          ))}
        </RepostsWrapper>
      </MessageContainer>
    </>
  );
};

export default Messages;
