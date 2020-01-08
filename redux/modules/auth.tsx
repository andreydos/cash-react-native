export const POST_LOGIN = 'cash/auth/LOGIN_LOAD';
export const POST_LOGIN_SUCCESS = 'cash/auth/LOGIN_LOAD_SUCCESS';
export const POST_LOGIN_FAIL = 'cash/auth/LOGIN_LOAD_FAIL';
export const GET_PROFILE = 'cash/auth/PROFILE_LOAD';
export const GET_PROFILE_SUCCESS = 'cash/auth/PROFILE_LOAD_SUCCESS';
export const GET_PROFILE_FAIL = 'cash/auth/PROFILE_LOAD_FAIL';

interface StateType {
  user: Object
  userProfile: Object,
  error: String,
  login_loading: Boolean,
  profile_loading: Boolean
}

const initialState: StateType = {
  user: null,
  userProfile: null,
  error: '',
  login_loading: false,
  profile_loading: false
};

export default function reducer(state: StateType = initialState, action: any) {
  switch (action.type) {
    case POST_LOGIN:
      console.log('POST_LOGIN');
      return {...state, login_loading: true};
    case POST_LOGIN_SUCCESS:
      console.log('POST_LOGIN_SUCCESS');

      return {...state, login_loading: false, user: action.payload.data};
    case POST_LOGIN_FAIL:
      console.log('POST_LOGIN_FAIL');

      return {
        ...state,
        login_loading: false,
        error: 'Error while login.' + action.error.message
      };
    case GET_PROFILE:
      return {...state, profile_loading: true};
    case GET_PROFILE_SUCCESS:
      return {...state, profile_loading: false, profile: action.payload.data};
    case GET_PROFILE_FAIL:
      return {
        ...state,
        profile_loading: false,
        error: 'Error while fetching profile.' + action.error.message
      };
    default:
      return state;
  }
}

export function getProfile(user) {
  return {
    type: GET_PROFILE,
    payload: {
      request: {
        url: `/users/me`
      }
    }
  };
}

export function login(user) {
  return {
    type: POST_LOGIN,
    payload: {
      request: {
        url: `/users/login`,
        method: 'POST',
        data: user
      }
    }
  };
}