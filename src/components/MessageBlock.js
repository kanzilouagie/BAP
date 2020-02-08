import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'mobx-react';

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

const MessageBlock = ({ post, userinfo }) => {
  // const [userInfo, setUserInfo] = useState([]);

  // useEffect(() => {
  //   getUserWithId(firebase.auth().currentUser.uid).then(info => {
  //     setUserInfo(info);
  //   });
  // }, []);
  // console.log('messageblok: ' + post.message);
  return (
    <MessageWrapper>
      <MessageTitle>{userinfo.username}</MessageTitle>
      <MessageBody>{post.message}</MessageBody>
    </MessageWrapper>
  );
};

MessageBlock.propTypes = {
  post: PropTypes.array,
  userinfo: PropTypes.array
};

export default MessageBlock;
