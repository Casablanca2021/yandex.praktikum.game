import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'common/consts';
import './App.css';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Forum from "pages/Forum";
import ForumView from "pages/ForumView";

export const App: FC = () => (
  <Switch>
    <Route path={ROUTES.SIGNIN} component={SignIn} />
    <Route path={ROUTES.SIGNUP} component={SignUp} />
    <Route path={ROUTES.FORUM_BY_CATEGORY} component={Forum} exact />
    <Route path={ROUTES.FORUM_VIEW} component={ForumView} exact />
    <Route path={ROUTES.FORUM} component={Forum} />
    <Route path={ROUTES.ROOT}>
      <h1>App component</h1>
    </Route>
  </Switch>
);
