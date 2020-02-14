import React, { useEffect, useState } from 'react';
import SideNavigation from '../../components/SideNavigation';
import styled from 'styled-components';
import Button from '../../components/Button';
import SecondaryButton from '../../components/SecondaryButton';
import logo from '../../assets/images/logo-think-pink-Europe.svg';
import { useHistory, Redirect } from 'react-router';
import firebase from '../../authentication/base';
const MyTeam = () => {
  const history = useHistory();
  const [teamId, setTeamId] = useState();

  useEffect(() => {
    const getTeamId = async () => {
      const ref = await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get();
      setTeamId(ref.data().teamId);
    };
    getTeamId();
  }, [teamId]);

  if (teamId != null && teamId != '' && teamId != undefined) {
    console.log(teamId);
    return <Redirect to="/teampage" />;
  }

  return (
    <Background>
      <TopNavigation>
        <img src={logo} />
        <RightNav>
          <Button color="#FF9FAA">?</Button>
        </RightNav>
      </TopNavigation>
      <HomeBody>
        <Button onClick={() => history.push('/')} border="#343988">
          Terug
        </Button>
        <Steps>
          <h1>Alleen is ook maar alleen… Maar als team sta je sterk!</h1>
          <p>
            Maak nu een team aan of sluit je aan bij een bestaand team en loop
            samen naar een virtuele overwinning!
          </p>
          <Choices>
            <div>
              <div>hier komt een image</div>
              <Button
                color="#FF9FAA"
                onClick={() => history.push('/createteam')}
              >
                Creër een team
              </Button>
            </div>
            <div>
              <div>hier komt een image</div>
              <Button color="#FF9FAA" onClick={() => history.push('/jointeam')}>
                Aansluiten bij team
              </Button>
            </div>
          </Choices>
        </Steps>
      </HomeBody>
    </Background>
  );
};

export default MyTeam;

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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-size: 35px;
    font-weight: bold;
    color: #e86565;
    margin-bottom: 2rem;
  }

  p {
    text-align: center;
    margin-bottom: 3rem;
  }
`;

const Choices = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  height: auto;

  & div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & div {
      background: #fd7b7c;
      width: 400px;
      height: 300px;
      margin-bottom: 3rem;
    }
  }
`;
