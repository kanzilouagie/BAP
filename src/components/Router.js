import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Overview from '../views/dashboard/Overview';
import Home from '../views/Home';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../authentication/Auth';
import MyTeam from '../views/dashboard/MyTeam';
import Looks from '../views/dashboard/Looks';
import Messages from '../views/dashboard/Messages';
import Statistics from '../views/dashboard/Statistics';
import ChooseWay from '../views/registration/ChooseWay';
import ChooseRunner from '../views/registration/ChooseRunner';
import CustomizeRunner from '../views/registration/CustomizeRunner';
import PersonalInformation from '../views/registration/PersonalInformation';
import ShareMessage from '../views/registration/ShareMessage';
// import ThreeCanvas from './ThreeCanvas';
import Detail from '../views/Detail';
import NewMessage from '../views/dashboard/NewMessage';
import Info from '../views/dashboard/Info';

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <ThreeCanvas /> */}
        <canvas
          id="three-canvas"
          style={{ width: '100vw', height: '100vh', position: 'absolute' }}
        ></canvas>
        <div style={{ position: 'relative', zIndex: '2' }}>
          {' '}
          <Switch>
            <PrivateRoute exact path="/" component={Overview} />
            <PrivateRoute exact path="/newmessage" component={NewMessage} />
            <PrivateRoute exact path="/messages" component={Messages} />
            <PrivateRoute exact path="/profile/info" component={Info} />
            <PrivateRoute exact path="/profile/looks" component={Looks} />
            <PrivateRoute exact path="/myteam" component={MyTeam} />
            <PrivateRoute exact path="/statistics" component={Statistics} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/step1" component={ChooseWay} />
            <Route exact path="/step2" component={ChooseRunner} />
            <Route exact path="/step3" component={CustomizeRunner} />
            <Route exact path="/step4" component={ShareMessage} />
            <Route exact path="/step5" component={PersonalInformation} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
