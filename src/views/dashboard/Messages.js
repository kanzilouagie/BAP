import React, { useEffect, useState } from 'react';
import SideNavigation from '../../components/SideNavigation';
import MessageBlock from '../../components/MessageBlock';
import styled from 'styled-components';
import {
  loadMessages,
  loadReposts,
  getPostWithUserId,
  getUserWithId
} from './store/index';
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
  const [reposts, setReposts] = useState([]);
  const [postData, setPostData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState([]);
  useEffect(() => {
    loadMessages(firebase.auth().currentUser.uid).then(posts => {
      setPosts(posts);
    });

    loadReposts(firebase.auth().currentUser.uid).then(reposts => {
      setReposts(reposts);
      reposts.map(post => {
        getPostWithUserId(post.data().userId, post.data().postId).then(post => {
          setPostData(oldArray => [...oldArray, post]);
        });
        getUserWithId(post.data().userId).then(info => {
          setUserInfo(oldArray => [...oldArray, info]);
        });
      });
    });

    getUserWithId(firebase.auth().currentUser.uid).then(info => {
      setCurrentUserInfo(info);
    });
  }, []);

  return (
    <>
      <SideNavigation />
      <MessageContainer>
        <MessagesWrapper>
          {posts.map(post => (
            <MessageBlock
              key={post.id}
              post={post.data()}
              userinfo={currentUserInfo}
            />
          ))}
        </MessagesWrapper>
        <RepostsWrapper>
          {postData.map((post, index) => {
            if (userInfo[index] != null) {
              return (
                <MessageBlock
                  key={reposts[index].id}
                  post={post}
                  userinfo={userInfo[index]}
                />
              );
            }
          })}
        </RepostsWrapper>
      </MessageContainer>
    </>
  );
};

export default Messages;
