import React, { useRef } from 'react';
import styled from 'styled-components';

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

const MessageBlock = data => {
  console.log(data);
  return (
    <>
      <h1>Reposted berichten</h1>
      <p>
        Repost een bericht van de deelnemers om hen zo een extra duwtje in de
        rug te geven!
      </p>
      {}
      <MessageWrapper>
        <MessageTitle>{data.message}</MessageTitle>
        <MessageBody>
          nskdfnskjdnfk jsdn kjkjnkj nkjsnkjnkjn jknkfj nsdlk nksld g sdn
          sjkngjkdsngkjsdndfjskjdfsjkfnksjnf kjsnkjsn kjfndsk jndskj nsdkj
          fnkjsdnf kjsdnf kjdsnf kjsdnf kjsdnf kjsdnfkj nsdkjfn skfnsldgsdn
          fjdsnfj ksdnf kjsdnfns jknkfj snkjfn kjdns jkng
        </MessageBody>
      </MessageWrapper>
    </>
  );
};

export default MessageBlock;
