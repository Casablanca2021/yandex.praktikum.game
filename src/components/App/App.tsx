import './App.css';

import { ROUTES } from 'common/consts';
import Root from 'components/Root';
import Forum from 'pages/Forum';
import ForumView from 'pages/ForumView';
import { Game } from 'pages/Game';
import Home from 'pages/Home';
import { Leaderboard } from 'pages/Leaderboard';
import Profile from 'pages/Profile';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import React, { FC } from 'react';
import { NotificationContainer } from 'react-notifications';
import { Route, Switch } from 'react-router-dom';

export const App: FC = () => (
  <>
    <Switch>
      <Route path={ROUTES.ROOT} exact component={Root} />
      <Route path={ROUTES.SIGNIN} component={SignIn} />
      <Route path={ROUTES.SIGNUP} component={SignUp} />
      <Route path={ROUTES.FORUM_BY_CATEGORY} component={Forum} exact />
      <Route path={ROUTES.FORUM_VIEW} component={ForumView} exact />
      <Route path={ROUTES.FORUM} component={Forum} />
      <Route path={ROUTES.PROFILE} component={Profile} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.LEADERBOARD} component={Leaderboard} />
      <Route path={ROUTES.GAME} component={Game} />
    </Switch>
    <NotificationContainer />
  </>
);
