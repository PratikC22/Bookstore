import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!localStorage.getItem('accessToken')) {
					return <Component {...props} />;
				} else {
					return <Redirect to='/home' />;
				}
			}}
		/>
	);
};

export default AuthRoute;
