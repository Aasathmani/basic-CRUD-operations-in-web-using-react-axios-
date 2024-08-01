// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk';
import employeeReducer from './reducer';

const store = createStore(employeeReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
