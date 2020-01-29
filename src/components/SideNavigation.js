import React from 'react';
import app from '../authentication/base';
import { Link } from 'react-router-dom';
const SideNavigation = () => {
  return (
    <nav>
      <h1>Home</h1>
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
    </nav>
  );
};

export default SideNavigation;
