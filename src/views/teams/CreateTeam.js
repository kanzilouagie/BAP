import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import SecondaryButton from '../../components/SecondaryButton';
import logo from '../../assets/images/logo-think-pink-Europe.svg';
import { useHistory } from 'react-router';
import firebase from '../../authentication/base';

const CreateTeam = () => {
  const history = useHistory();
  const [isPublic, setIsPublic] = useState(true);

  const handleMakeTeam = useCallback(
    async event => {
      event.preventDefault();
      const { teamname, teaminfo } = event.target.elements;
      try {
        const ref = firebase
          .firestore()
          .collection('teams')
          .doc();
        ref.set({
          name: teamname.value,
          description: teaminfo.value,
          public: isPublic
        });
        ref
          .collection('members')
          .doc(firebase.auth().currentUser.uid)
          .set({});
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set(
            {
              teamId: ref.id,
              teamCaptain: true
            },
            { merge: true }
          );
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history, isPublic]
  );

  return (
    <Background>
      <TopNavigation>
        <img src={logo} alt="logo" />
        <RightNav>
          <Button color="#FF9FAA">?</Button>
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
            <h1>Creër jouw dream team</h1>
            <div style={{ width: 200, height: 200 }}></div>
          </LeftContainer>
          <RightContainer>
            <form onSubmit={handleMakeTeam}>
              <label>Kies een leuke teamnaam:</label>
              <input name="teamname" type="text" placeholder="Devine" />
              <label>Vertel ons wat meer over je team:</label>
              <textarea
                name="teaminfo"
                cols="80"
                rows="10"
                placeholder="Inspireer andere deelnemers om zich in jouw team aan te sluiten."
              />
              <label>Openbaar of gesloten team?</label>
              <p>
                *(bij een openbaar team kunnen alle deelnemers jouw team vinden
                en kunnen ze zich aansluiten zonder bevestiging van de
                teamcaptain)
              </p>
              <div className="buttons">
                <StyledButton
                  active={isPublic}
                  onClick={() => setIsPublic(true)}
                  border="#343988"
                >
                  openbaar
                </StyledButton>
                <StyledButton
                  active={!isPublic}
                  onClick={() => setIsPublic(false)}
                  border="#343988"
                >
                  gesloten
                </StyledButton>
              </div>
              <SubmitButton
                style={{ alignSelf: 'flex-end' }}
                height={'50px'}
                width={'auto'}
                padding={'0 20px'}
                type="submit"
              >
                Team aanmaken
              </SubmitButton>
            </form>
          </RightContainer>
        </Steps>
      </HomeBody>
    </Background>
  );
};

export default CreateTeam;

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

const StyledButton = styled.a`
  padding: 0.5rem 1.2rem;
  width: ${({ width }) => (width ? width : 'auto')};
  color: ${({ border }) => (border ? border : 'black')};
  font-size: 1.6rem;
  background-color: ${({ color }) => (color ? color : 'transparent')};
  border: solid black 0.2rem;
  border-color: ${({ border }) => (border ? border : 'black')};
  border-radius: 1rem;
  position: relative;
  transition: 0.1s;
  top: ${props => (props.active ? '0.6rem' : '0')};
  cursor: pointer;

  &::after {
    content: '';
    display: inline-block;
    background-color: ${({ color }) => (color ? color : 'transparent')};
    border: solid black 0.2rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-color: ${({ border }) => (border ? border : 'black')};
    border-top: none;
    position: absolute;
    top: ${props => (props.active ? '0.4rem' : '1rem')};
    left: -0.2rem;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: 0.1s;
  }

  &:active {
    top: 0.6rem;
    &::after {
      top: 0.4rem;
    }
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
