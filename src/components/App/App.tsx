import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'common/consts';
import { Profile } from 'pages/Profile';
import { Leaderboard } from 'pages/Leaderboard';
import { Home } from 'pages/Home';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import './App.css';

export const App: FC = () => (
  <Switch>
    <Route path={ROUTES.SIGNIN} component={SignIn} />
    <Route path={ROUTES.SIGNUP} component={SignUp} />
    <Route path={ROUTES.PROFILE} component={Profile} />
    <Route path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.LEADERBOARD} component={Leaderboard} />
    <Route path={ROUTES.ROOT}>
      <h1>App component</h1>
    </Route>
  </Switch>
);
