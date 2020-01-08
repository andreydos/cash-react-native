import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import auth from './modules/auth';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
  baseURL: 'https://api.github.com',
  responseType: 'json'
});

const loggerMiddleware = createLogger();

// const createStoreWithMiddleware = applyMiddleware( loggerMiddleware, axiosMiddleware(client))(createStore);

const reducers = combineReducers({
  auth
});
//
// const configureStore = (initialState = {}) => createStoreWithMiddleware(reducer, initialState);
// export default configureStore;

let store = createStore(
  reducers, //custom reducers
  applyMiddleware(
    loggerMiddleware,
    axiosMiddleware(client) //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
  )
)

export default store;