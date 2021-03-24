import React, {FC} from 'react';
import {Switch, Route} from 'react-router-dom';
import {ROUTES} from 'common/consts';
import './app.css';

export const App: FC = () => {
	return (
		<Switch>
			<Route path={ROUTES.SIGNIN}>
				<h1>Signin</h1>
			</Route>
			<Route path={ROUTES.SIGNUP}>
				<h1>Signup</h1>
			</Route>
			<Route path={ROUTES.ROOT}>
				<div className="appcomponent">
					<h1>App component</h1>
				</div>
			</Route>
		</Switch>
	);
};
