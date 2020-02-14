import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import Button from '../../components/Button';
import logo from '../../assets/images/logo_think_pink.png';
import { useHistory } from 'react-router';
import firebase from '../../authentication/base';
import TeamBlock from '../../components/TeamBlock';

const JoinTeam = () => {
  const history = useHistory();
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [teamCount, setTeamCount] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      const teamsRef = await firebase
        .firestore()
        .collection('teams')
        .get();
      teamsRef.forEach(team => {
        setTeams(oldArray => [...oldArray, team]);
        setFilteredTeams(oldArray => [...oldArray, team]);
        firebase
          .firestore()
          .collection('teams')
          .doc(team.id)
          .collection('members')
          .get()
          .then(snap => {
            setTeamCount(oldArray => [...oldArray, snap.size]);
          });
      });
    };
    getTeams();
  }, []);

  const handleSearchTeam = useCallback(
    async event => {
      event.preventDefault();
      const { q } = event.target.elements;
      console.log(q.value);
      var teamNames = teams.filter(team => {
        console.log(team.data());
        return team
          .data()
          .name.toLowerCase()
          .includes(q.value.toLowerCase());
      });
      setFilteredTeams(teamNames);
    },
    [teams]
  );

  return (
    <Background>
      <TopNavigation>
        <img src={logo} />
        <RightNav>
          <Button color="#FF9FAA">?</Button>
        </RightNav>
      </TopNavigation>
      <HomeBody>
        <Button
          border="#343988"
          onClick={() => history.push('/myteam')}
          style={{
            position: 'relative'
          }}
        >
          Terug
        </Button>
        <Steps>
          <LeftContainer>
            <h1>Sluit je aan bij jouw dream</h1>
            <div style={{ width: 200, height: 200 }}></div>
          </LeftContainer>
          <RightContainer>
            <form onSubmit={handleSearchTeam}>
              <label>team zoeken</label>
              <input type="search" name="q" />
            </form>
            <ScrollDiv>
              {filteredTeams.map((team, index) => (
                <TeamBlock
                  key={team.id}
                  team={team.data()}
                  teamId={team.id}
                  teamCount={teamCount[index]}
                />
              ))}
            </ScrollDiv>
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

const ScrollDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 70vh;
  // background: white;
  padding: 2rem;
  overflow-y: scroll;
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
  justify-content: flex-end;
  align-items: flex-end;

  form {
    box-sizing: border-box;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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
