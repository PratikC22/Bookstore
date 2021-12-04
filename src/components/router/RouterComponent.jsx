import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from '../loginSignup/Main';
import PageNotFound from '../PageNotFound';
import Home from '../home/Home';
import BookInfo from '../viewBooks/BookInfo';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import MyCart from '../myCart/MyCart';
import OrderPlaced from '../orderPlaced/OrderPlaced';
import WishList from '../wishlist/WishList';

const RouterComponent = () => {
	return (
		<Router>
			<Switch>
				<AuthRoute path='/' exact component={Main}></AuthRoute>
				<PrivateRoute path='/home' component={Home}></PrivateRoute>
				<PrivateRoute
					path='/book-info/:bookId'
					component={BookInfo}
				></PrivateRoute>
				<PrivateRoute path='/my-cart' component={MyCart}></PrivateRoute>
				<PrivateRoute
					path='/order-placed'
					component={OrderPlaced}
				></PrivateRoute>
				<PrivateRoute path='/wish-list' component={WishList}></PrivateRoute>
				<Route path='*' component={PageNotFound}></Route>
			</Switch>
		</Router>
	);
};

export default RouterComponent;
