import React, { useState } from 'react';
import app from '../authentication/base';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import firebase from '../authentication/base';
const SideNavigation = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <NavigationButton>
        <button
          className="loginButton"
          onClick={() =>
            firebase.auth().currentUser ? app.auth().signOut() : null
          }
        >
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: '#343988',
              fontWeight: 'bold'
            }}
          >
            {firebase.auth().currentUser ? 'Afmelden' : 'Aanmelden'}
          </Link>
        </button>
        <Button
          border="#343988"
          color="#FFDDE1"
          onClick={() => setShowNav(!showNav)}
        >
          Menu
        </Button>
      </NavigationButton>
      <MainNavigation showNav={showNav}>
        <TopNavigation>
          <button>
            <Link to={firebase.auth().currentUser ? '/profile/info' : '/login'}>
              Mijn profiel
            </Link>
          </button>
        </TopNavigation>
        <BottomNavigation>
          <a href="">Wat doen wij?</a>
          <a href="">Race for the Cure</a>
          <a href="">Help &amp; FAQs</a>
          <a href="">Informeren borstkanker</a>
        </BottomNavigation>
      </MainNavigation>
    </>
  );
};

export default SideNavigation;

const NavigationButton = styled.div`
  z-index: 3000;
  position: absolute;
  right: 20px;
  top: 20px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .loginButton {
    background: none;
    border: none;
  }
`;

const MainNavigation = styled.nav`
  position: absolute;
  width: 60vw;
  height: 100vh;
  right: ${props => (props.showNav ? '0' : '-60vw')};
  background: #e86565;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  transition: 0.5s ease-in-out;
  z-index: 1000;
`;

const TopNavigation = styled.div`
  margin-bottom: 3rem;
  button {
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 20px 0px 70px;
    margin-bottom: 2rem;
  }

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 40px;
  }
`;

const BottomNavigation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  a {
    text-decoration: none;
    color: #f69796;
    font-weight: bold;
    font-size: 30px;
    padding: 0 20px 0px 70px;
    margin-bottom: 2rem;
  }
`;

{
  /* <nav>
<h1>Home</h1>
<button>
  <Link to="/newmessage">Nieuw bericht</Link>
</button>
<button>
  <Link to="/">Overzicht</Link>
</button>
<button>
  <Link to="/myteam">Mijn Team</Link>
</button>
<button>
  <Link to="/looks">Look aanpassen</Link>
</button>
<button>
  <Link to="/messages">Berichten bekijken</Link>
</button>
<button>
  <Link to="/statistics">statistieken</Link>
</button>
<button onClick={() => app.auth().signOut()}>Sign out</button>
</nav> */
}
