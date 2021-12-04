import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { cartItemReducer, bookReducer } from './BookReducer';

const reducer = combineReducers({
	bookReducer: bookReducer,
	cartItemReducer: cartItemReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
