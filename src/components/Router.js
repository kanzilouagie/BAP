import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../authentication/Auth';
import ThreeCanvas from './ThreeCanvas';

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThreeCanvas />
        <div style={{ position: 'relative', zIndex: '2' }}>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
