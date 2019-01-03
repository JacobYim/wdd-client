import { createStore, applyMiddleware } from 'redux';
import penderMiddleware from 'redux-pender';
import reducers from './modules';

const store = createStore(reducers, applyMiddleware(penderMiddleware()));
export default store;
