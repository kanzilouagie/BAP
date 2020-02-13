import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import logo from '../../assets/images/logo_think_pink.png';
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
          .set({
            teamId: ref.id,
            teamCaptain: true
          });
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
              <label>openbaar of gesloten team?</label>
              <p>
                *(bij een openbaar team kunnen alle deelnemers jouw team vinden
                en kunnen ze zich aansluiten zonder bevestiging van de
                teamcaptain)
              </p>
              <PublicButton
                isPublic={isPublic}
                onClick={() => setIsPublic(true)}
                height={'30px'}
                width={'auto'}
                padding={'0 10px'}
                style={{
                  fontSize: '16px',
                  marginBottom: '2rem',
                  position: 'relative'
                }}
              >
                openbaar
              </PublicButton>
              <PrivateButton
                isPublic={isPublic}
                onClick={() => setIsPublic(false)}
                height={'30px'}
                width={'auto'}
                padding={'0 10px'}
                style={{
                  fontSize: '16px',
                  marginBottom: '2rem',
                  position: 'relative'
                }}
              >
                gesloten
              </PrivateButton>
              <button
                style={{ alignSelf: 'flex-end' }}
                height={'50px'}
                width={'auto'}
                padding={'0 20px'}
                type="submit"
              >
                Team aanmaken
              </button>
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

const LeftContainer = styled.div``;

const RightContainer = styled.div``;

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
