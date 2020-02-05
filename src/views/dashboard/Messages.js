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
// setMessagesData(r)
const Messages = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    loadMessages(firebase.auth().currentUser.uid)
      .then(posts => {
        setPosts(posts);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <>
      {posts.map(post => (
        <p key={post.id}>{post.data().message}</p>
      ))}
    </>
  );
};

export default Messages;

{
  /* <>
<SideNavigation />
<MessagesWrapper>
  <MessageBlock data={messagesData} />
  <RepostBlock />
</MessagesWrapper>
</> */
}
