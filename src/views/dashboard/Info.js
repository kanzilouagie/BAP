import React, { useCallback } from 'react';
import globals from '../../three/globals';

import firebase from '../../authentication/base';
import ProfileWrapper from '../../components/ProfileWrapper';
import { useState } from 'react';
import styled from 'styled-components';

const Info = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    const localData = { ...globals.character };
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({ character: localData });
    setIsSaving(false);
  }, [globals.character]);

  return (
    <ProfileWrapper>
      <Container>
        <h1>Info</h1>

        <button disabled={isSaving} onClick={() => handleSave()}>
          Opslaan
        </button>
      </Container>
    </ProfileWrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & * {
    margin-top: 2rem;
  }
`;

export default Info;
