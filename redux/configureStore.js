import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import common from './modules/common';
import auth from './modules/auth';
import wallets from './modules/wallets';
import axios from 'axios';
import thunk from 'redux-thunk';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

const loggerMiddleware = createLogger();

const reducers = combineReducers({
  common,
  auth,
  wallets
});

let store = createStore(
  reducers, //custom reducers
  applyMiddleware(
    loggerMiddleware,
    thunk
  )
)

export default store;