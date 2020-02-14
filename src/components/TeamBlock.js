import React, { useCallback } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Button from '../components/Button';
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
        <div className="img">
          <img />
        </div>
        <div className="info">
          <p>{team.name}</p>
          <p>{teamCount} leden</p>
        </div>
      </BlockInfo>

      <Button
        style={{ marginLeft: '5px' }}
        color="#FF9FAA"
        onClick={handleJoinTeam}
      >
        joinen
      </Button>
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
  align-items: flex-start;
  width: 100%;
  height: 50px;
  margin-bottom: 3rem;
`;

const BlockInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #343988;
  flex: 1;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;

  .img {
    width: 50px;
    height: 100%;
    background: white;
  }

  .info {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
`;
