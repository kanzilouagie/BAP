import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import logo from '../../assets/images/logo_think_pink.png';
import { useHistory } from 'react-router';
import firebase from '../../authentication/base';
import TeamBlock from '../../components/TeamBlock';

const JoinTeam = () => {
  const history = useHistory();
  const [isPublic, setIsPublic] = useState(true);
  const [teams, setTeams] = useState([]);
  const [teamCount, setTeamCount] = useState([]);

  useEffect(() => {
    let teamArray = [];
    const getTeams = async () => {
      const teams = await firebase
        .firestore()
        .collection('teams')
        .get();
      teams.forEach(team => {
        setTeams(oldArray => [...oldArray, team]);
        firebase
          .firestore()
          .collection('teams')
          .doc(team.id)
          .collection('members')
          .get()
          .then(snap => setTeamCount(oldArray => [...oldArray, snap.size]));
      });
    };
    getTeams();
  }, []);

  return (
    <Background>
      <TopNavigation>
        <img src={logo} />
        <RightNav>
          <PrimaryButton height={'50px'} width={'auto'} padding={'0 20px'}>
            ?
          </PrimaryButton>
        </RightNav>
      </TopNavigation>
      <HomeBody>
        <SecondaryButton
          onClick={() => history.push('/myteam')}
          height={'30px'}
          width={'auto'}
          padding={'0 10px'}
          style={{
            fontSize: '16px',
            marginBottom: '2rem',
            position: 'relative'
          }}
        >
          Terug
        </SecondaryButton>
        <Steps>
          <LeftContainer>
            <h1>Sluit je aan bij jouw dream</h1>
            <div style={{ width: 200, height: 200 }}></div>
          </LeftContainer>
          <RightContainer>
            {teams.map(
              (team, index) => (
                console.log(teamCount),
                (
                  <TeamBlock
                    key={team.id}
                    team={team.data()}
                    teamId={team.id}
                    teamCount={teamCount[index]}
                  />
                )
              )
            )}
          </RightContainer>
        </Steps>
      </HomeBody>
    </Background>
  );
};

export default JoinTeam;


const Background = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background: #ffdde1;
`;

const HomeBody = styled.div`
  padding: 0 40px;

  h2 {
    position: relative;
    font-size: 20px;
    font-weight: bold;
    color: #343988;
    margin-bottom: 2rem;
  }
`;

const TopNavigation = styled.nav`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const RightNav = styled.div`
  width: 187.05px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const Steps = styled.div`
  position: relative;
  top: -20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  h1 {
    font-size: 35px;
    font-weight: bold;
    color: #e86565;
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 3rem;
    font-size: 13px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
  height: 100%;
  width: 100%;

  h1 {
    width: 350px;
    align-self: flex-end;
    font-size: 50px;
    font-weight: bold;
    line-height: 58px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  label {
    color: #ef534f;
    padding-bottom: 6px;
  }

  input {
    margin-bottom: 2rem;
    background: none;
    border: 2px solid black;
    padding: 1rem;
    width: 300px;
    border-radius: 10px;
  }

  textarea {
    margin-bottom: 2rem;
    padding: 1rem;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    width: 600px;
  }

  .buttons {
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const PublicButton = styled.a`
  cursor: pointer;
  text-shadow: ${props =>
    props.isPublic
      ? '0 -2px 0 #343988, 0 1px 1px #6066c2, 0 0 4px white'
      : '0 -2px 0 #181a3e, 0 1px 1px #6066c2'};
  box-sizing: border-box;
  font-size: 2em;
  font-family: Helvetica, Arial, Sans-Serif;
  text-decoration: none;
  font-weight: bold;
  color: ${props => (props.isPublic ? '#262a63' : '#262a63')};
  height: ${props => props.height || '40px'};
  line-height: ${props => props.height || '40px'};
  display: inline-block;
  width: ${props => props.width || '40px'};
  padding: ${props => props.padding || '40px'};
  background: linear-gradient(to bottom, #222ee6 0%, #323bc7 26%, #343988 100%);
  border-radius: 5px;
  border-top: 1px solid #676dc5;
  border-bottom: 1px solid #6066c2;
  top: ${props => (props.isPublic ? '0' : '6px')};
  transition: all 0.06s ease-out;
  position: relative;

  &:visited {
    color: #262a63;
  }
  &:hover {
    background: linear-gradient(
      to bottom,
      #2c37e7 0%,
      #3740cc 26%,
      #373c8f 100%
    );
  }
  &:active {
    top: 6px;
    text-shadow: 0 -2px 0 #343988, 0 1px 1px #6066c2, 0 0 4px white;
    color: #3b419a;
  }
  &:active:before {
    top: 0;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
  }
  &:before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
    top: ${props => (props.isPublic ? '0' : '6px')};
    border-radius: 5px;
    height: ${props => props.height || '38px'};
    background: linear-gradient(to top, #000 0%, #0e102f 6px);
    transition: all 0.078s ease-out;
    box-shadow: ${props =>
      props.isPublic
        ? '0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2)'
        : '0 1px 0 2px rgba(0, 0, 0, 0.3), 0 5px 2.4px rgba(0, 0, 0, 0.5),0 10.8px 9px rgba(0, 0, 0, 0.2)'};
  }
`;

const PrivateButton = styled.a`
  cursor: pointer;
  text-shadow: ${props =>
    !props.isPublic
      ? '0 -2px 0 #343988, 0 1px 1px #6066c2, 0 0 4px white'
      : '0 -2px 0 #181a3e, 0 1px 1px #6066c2'};
  box-sizing: border-box;
  font-size: 2em;
  font-family: Helvetica, Arial, Sans-Serif;
  text-decoration: none;
  font-weight: bold;
  color: ${props => (!props.isPublic ? '#262a63' : '#262a63')};
  height: ${props => props.height || '40px'};
  line-height: ${props => props.height || '40px'};
  display: inline-block;
  width: ${props => props.width || '40px'};
  padding: ${props => props.padding || '40px'};
  background: linear-gradient(to bottom, #222ee6 0%, #323bc7 26%, #343988 100%);
  border-radius: 5px;
  border-top: 1px solid #676dc5;
  border-bottom: 1px solid #6066c2;
  top: ${props => (props.isPublic ? '0' : '6px')};
  transition: all 0.06s ease-out;
  position: relative;

  &:visited {
    color: #262a63;
  }
  &:hover {
    background: linear-gradient(
      to bottom,
      #2c37e7 0%,
      #3740cc 26%,
      #373c8f 100%
    );
  }
  &:active {
    top: 6px;
    text-shadow: 0 -2px 0 #343988, 0 1px 1px #6066c2, 0 0 4px white;
    color: #3b419a;
  }
  &:active:before {
    top: 0;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
  }
  &:before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
    top: ${props => (!props.isPublic ? '0' : '6px')};
    border-radius: 5px;
    height: ${props => props.height || '38px'};
    background: linear-gradient(to top, #000 0%, #0e102f 6px);
    transition: all 0.078s ease-out;
    box-shadow: ${props =>
      !props.isPublic
        ? '0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2)'
        : '0 1px 0 2px rgba(0, 0, 0, 0.3), 0 5px 2.4px rgba(0, 0, 0, 0.5),0 10.8px 9px rgba(0, 0, 0, 0.2)'};
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  text-shadow: 0 -2px 0 #ff3353, 0 1px 1px #fff;
  box-sizing: border-box;
  font-size: 1em;
  font-family: Helvetica, Arial, Sans-Serif;
  text-decoration: none;
  font-weight: bold;
  color: #ff667e;
  height: ${props => props.height || '40px'};
  line-height: ${props => props.height || '40px'};
  display: inline-block;
  width: ${props => props.width || '40px'};
  background: linear-gradient(to bottom, #ffe6ea 0%, #ffd6dd 26%, #ff99a9 100%);
  padding: ${props => props.padding || '40px'};
  border-radius: 5px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  top: 0;
  transition: all 0.06s ease-out;
  position: relative;

  &:visited {
    color: #ff667e;
  }
  &:hover {
    background: linear-gradient(
      to bottom,
      #fff0f2 0%,
      #ffe0e5 26%,
      #ffa3b2 100%
    );
  }
  &:active {
    top: 6px;
    text-shadow: 0 -2px 0 #ff99a9, 0 1px 1px #fff, 0 0 4px white;
    color: #ffb3bf;
  }
  &:active:before {
    top: 0;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
  }
  &:before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
    top: 6px;
    border-radius: 5px;
    height: ${props => props.height || '38px'};
    background: linear-gradient(to top, #cc0020 0%, #ff1a3e 6px);
    transition: all 0.078s ease-out;
    box-shadow: 0 1px 0 2px rgba(0, 0, 0, 0.3), 0 5px 2.4px rgba(0, 0, 0, 0.5),
      0 10.8px 9px rgba(0, 0, 0, 0.2);
  }
`;
