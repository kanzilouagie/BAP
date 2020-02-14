import React, { useCallback } from 'react';
import globals from '../../three/globals';

import CustomizerInputRow from '../../components/CustomizerInputRow';
import firebase from '../../authentication/base';
import ProfileWrapper from '../../components/ProfileWrapper';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

const Looks = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleItemChange = (val, category) => {
    globals.character[category] = val;
    globals.currentScene.changeLook(); // update
  };

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
        <h1>Personaliseer deelnemer</h1>
        <CustomizerInputRow
          category="head"
          onChange={(val, category) => handleItemChange(val, category)}
        />
        <CustomizerInputRow
          category="body"
          onChange={(val, category) => handleItemChange(val, category)}
        />
        <CustomizerInputRow
          category="foot"
          onChange={(val, category) => handleItemChange(val, category)}
        />
        <Button
          border="#343988"
          width="10rem"
          disabled={isSaving}
          onClick={() => handleSave()}
          style={{ marginTop: '8rem' }}
        >
          Opslaan
        </Button>
      </Container>
    </ProfileWrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    margin-bottom: 2rem;
    margin-top: 2rem;
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
  }

  & > * {
    margin-top: 2rem;
  }
`;

export default Looks;
