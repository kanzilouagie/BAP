import React from 'react';
import styled from 'styled-components';
import { array } from 'prop-types';

const MessageBlock = ({ post, userinfo }) => {
  return (
    <MessageWrapper>
      <MessageTitle>{userinfo.username}</MessageTitle>
      <MessageBody>{post.message}</MessageBody>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  width: 60rem;
  height: 40rem;
  background: white;
  padding: 2rem;
  margin: 2rem;
  border-radius: 2rem;
  border: 2px solid black;
`;

const MessageTitle = styled.p`
  font-family: Roboto;
  font-weight: bold;
  font-size: 2rem;
`;

const MessageBody = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 1.6rem;
`;

MessageBlock.propTypes = {
  post: array,
  userinfo: array
};

export default MessageBlock;
