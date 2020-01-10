import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const POST_LOGIN = 'cash/auth/LOGIN_LOAD';
export const POST_LOGIN_SUCCESS = 'cash/auth/LOGIN_LOAD_SUCCESS';
export const POST_LOGIN_FAIL = 'cash/auth/LOGIN_LOAD_FAIL';
export const POST_REGISTER = 'cash/auth/REGISTER_LOAD';
export const POST_REGISTER_SUCCESS = 'cash/auth/REGISTER_LOAD_SUCCESS';
export const POST_REGISTER_FAIL = 'cash/auth/REGISTER_LOAD_FAIL';
export const GET_PROFILE = 'cash/auth/PROFILE_LOAD';
export const GET_PROFILE_SUCCESS = 'cash/auth/PROFILE_LOAD_SUCCESS';
export const GET_PROFILE_FAIL = 'cash/auth/PROFILE_LOAD_FAIL';
export const SAVE_TOKEN = 'cash/auth/SAVE_TOKEN';
export const REMOVE_TOKEN = 'cash/auth/REMOVE_TOKEN';
export const SET_ERROR = 'cash/auth/SET_ERROR';

interface StateType {
  user: Object
  userProfile: Object,
  error: String,
  userToken: String,
  login_pending: Boolean,
  register_pending: Boolean,
  profile_loading: Boolean
}

interface UserType {
  email: string;
  password: string;
}

const initialState: StateType = {
  user: null,
  userToken: '',
  userProfile: null,
  error: '',
  login_pending: false,
  register_pending: false,
  profile_loading: false
};

export default function reducer(state: StateType = initialState, action: any) {
  switch (action.type) {
    case POST_LOGIN:
      return {...state, login_pending: true, error: ''};
    case POST_LOGIN_SUCCESS:
      return {...state, login_pending: false, user: action.payload};
    case POST_LOGIN_FAIL:
      return {
        ...state,
        login_pending: false,
        error: 'Error while login.' + action.error.response.data.message  || ''
      };
    case POST_REGISTER:
      return {...state, register_pending: true, error: ''};
    case POST_REGISTER_SUCCESS:
      return {...state, register_pending: false, user: action.payload};
    case POST_REGISTER_FAIL:
      return {
        ...state,
        register_pending: false,
        error: 'Error while registration.' + action.error.response.data.message || ''
      };
    case GET_PROFILE:
      return {...state, profile_loading: true, error: ''};
    case GET_PROFILE_SUCCESS:
      return {...state, profile_loading: false, profile: action.payload};
    case GET_PROFILE_FAIL:
      return {
        ...state,
        profile_loading: false,
        error: 'Error while fetching profile.' + action.error.response.data.message || ''
      };
    case SAVE_TOKEN:
      return {...state, userToken: action.payload};
    case REMOVE_TOKEN:
      return {...state, userToken: ''};
    case SET_ERROR:
      return {...state, error: action.error.message};
    default:
      return state;
  }
}

export const login = (user: UserType) => {
  return dispatch => {
    dispatch(loginPending());

    axios
      .post('/users/login', user)
      .then(res => {
        dispatch(loginSuccess(res));
      })
      .catch(err => {
        dispatch(loginFailure(err));
      });
  };
};

const loginSuccess = (user) => ({
  type: POST_LOGIN_SUCCESS,
  payload: {
    ...user
  }
});

const loginPending = () => ({
  type: POST_LOGIN
});

const loginFailure = error => ({
  type: POST_LOGIN_FAIL,
  error
});

export const register = (user: UserType) => {
  return dispatch => {
    dispatch(registerPending());

    axios
      .post('/users/register', user)
      .then(res => {
        dispatch(registerSuccess(res));
      })
      .catch(err => {
        dispatch(registerFailure(err));
      });
  };
};

const registerSuccess = (user) => ({
  type: POST_REGISTER_SUCCESS,
  payload: {
    ...user
  }
});

const registerPending = () => ({
  type: POST_REGISTER
});

const registerFailure = error => ({
  type: POST_REGISTER_FAIL,
  error
});


export const saveTokenToStore = token => ({
  type: SAVE_TOKEN,
  payload: token
});

export const removeTokenFromStore = () => ({
  type: REMOVE_TOKEN
});

export const setError = (error: string) => ({
  type: SET_ERROR,
  error: {
    message: error
  }
});

export const getUserToken = () => dispatch =>
  AsyncStorage.getItem('cashAppUserToken')
    .then((data) => {
      dispatch(saveTokenToStore(data));
    })
    .catch((err) => {
      dispatch(setError(err.message || 'Error white getting user token'));
    });

export const saveUserToken = (data: string) => dispatch =>
  AsyncStorage.setItem('cashAppUserToken', data)
    .then(() => {
      dispatch(saveTokenToStore(data));
    })
    .catch((err) => {
      dispatch(setError(err.message || 'Error white saving user token'));
    });

export const removeUserToken = () => dispatch =>
  AsyncStorage.removeItem('userToken')
    .then(() => {
      dispatch(removeTokenFromStore());
    })
    .catch((err) => {
      dispatch(setError(err.message || 'Error white remove user token'));
    });