import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Overview from '../views/dashboard/Overview';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../authentication/Auth';
import MyTeam from '../views/dashboard/MyTeam';
import Looks from '../views/dashboard/Looks';
import Messages from '../views/dashboard/Messages';
import Statistics from '../views/dashboard/Statistics';
import ChooseRunner from '../views/registration/ChooseRunner';
import CustomizeRunner from '../views/registration/CustomizeRunner';
import PersonalInformation from '../views/registration/PersonalInformation';
import ShareMessage from '../views/registration/ShareMessage';

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Overview} />
          <PrivateRoute exact path="/myteam" component={MyTeam} />
          <PrivateRoute exact path="/looks" component={Looks} />
          <PrivateRoute exact path="/messages" component={Messages} />
          <PrivateRoute exact path="/statistics" component={Statistics} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/step1" component={ChooseRunner} />
          <Route exact path="/step2" component={CustomizeRunner} />
          <Route exact path="/step3" component={PersonalInformation} />
          <Route exact path="/step4" component={ShareMessage} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
