import React, { useCallback } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import PrimaryButton from '../components/PrimaryButton';
import firebase from '../authentication/base';
import { useHistory } from 'react-router';

const TeamBlock = ({ team, teamCount, teamId }) => {
  const history = useHistory();

  const handleJoinTeam = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .set(
        {
          teamId: teamId,
          teamCaptain: false
        },
        { merge: true }
      );
    firebase
      .firestore()
      .collection('teams')
      .doc(teamId)
      .collection('members')
      .doc(firebase.auth().currentUser.uid)
      .set({});
    history.push('/teampage');
  };

  return (
    <BlockWrapper>
      <BlockInfo>
        {console.log(teamCount)}
        <img />
        <p>{team.name}</p>
        <p>{teamCount}</p>
      </BlockInfo>
      <PrimaryButton
        height={'50px'}
        width={'auto'}
        padding={'0 20px'}
        onClick={handleJoinTeam}
      >
        joinen
      </PrimaryButton>
    </BlockWrapper>
  );
};

TeamBlock.propTypes = {
  team: PropTypes.object,
  teamCount: PropTypes.number,
  teamId: PropTypes.string
};

export default TeamBlock;

const BlockWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BlockInfo = styled.div``;
