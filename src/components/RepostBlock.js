import React from 'react';
import styled from 'styled-components';

const RepostWrapper = styled.div`
  width: 60rem;
  height: 40rem;
  background: white;
  padding: 2rem;
  margin: 2rem;
  border-radius: 2rem;
  border: 2px solid black;
`;

const RepostTitle = styled.p`
  font-family: Roboto;
  font-weight: bold;
  font-size: 2rem;
`;

const RepostBody = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 1.6rem;
`;

const RepostBlock = () => {
  return (
    <>
      <RepostWrapper>
        <RepostTitle>titel</RepostTitle>
        <RepostBody>
          nskdfnskjdnfk jsdn kjkjnkj nkjsnkjnkjn jknkfj nsdlk nksld g sdn
          sjkngjkdsngkjsdndfjskjdfsjkfnksjnf kjsnkjsn kjfndsk jndskj nsdkj
          fnkjsdnf kjsdnf kjdsnf kjsdnf kjsdnf kjsdnfkj nsdkjfn skfnsldgsdn
          fjdsnfj ksdnf kjsdnfns jknkfj snkjfn kjdns jkng
        </RepostBody>
      </RepostWrapper>
    </>
  );
};

export default RepostBlock;
