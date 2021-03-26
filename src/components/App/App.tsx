import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'common/consts';
import './App.css';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import { ProfilePage } from 'pages/Profile';
import Home from 'pages/Home/Home';
import { Leaderboard } from 'pages/Leaderboard';

const App: FC = () => (
  <Switch>
    <Route path={ROUTES.SIGNIN} component={SignIn} />
    <Route path={ROUTES.SIGNUP} component={SignUp} />
    <Route path={ROUTES.PROFILE} component={ProfilePage} />
    <Route path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.LEADERBOARD} component={Leaderboard} />
    <Route path={ROUTES.ROOT}>
      <h1>App component</h1>
    </Route>
  </Switch>
);

export default App;
