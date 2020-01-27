import axios from 'axios';
import { SET_ERROR } from './common';

export const POST_WALLETS = 'cash/wallets/WALLETS_LOAD';
export const POST_WALLETS_SUCCESS = 'cash/wallets/WALLETS_LOAD_SUCCESS';
export const POST_WALLETS_FAIL = 'cash/wallets/WALLETS_LOAD_FAIL';

interface StateType {
  wallets: Array<object>,
  wallets_pending: Boolean
}

const initialState: StateType = {
  wallets: [],
  wallets_pending: false
};

export default function reducer(state: StateType = initialState, action: any) {
  switch (action.type) {
    case POST_WALLETS:
      return {...state, wallets_pending: true};
    case POST_WALLETS_SUCCESS:
      return {...state, wallets_pending: false, wallets: action.payload};
    case POST_WALLETS_FAIL:
      return {
        ...state,
        wallets_pending: false,
      };
    default:
      return state;
  }
}

export const getUserWallets = () => {
  return dispatch => {
    dispatch(walletsPending());

    axios
      .get('/wallets/all')
      .then(res => {
        dispatch(walletsSuccess(res.data));
      })
      .catch(error => {
        const response = error.response && error.response.data.message;
        const details = response || error.message || '';

        dispatch(setError('Error while login. ' + details));
        dispatch(walletsFailure());
      });
  };
};

const walletsSuccess = (wallets) => ({
  type: POST_WALLETS_SUCCESS,
  payload: {
    ...wallets
  }
});

const walletsPending = () => ({
  type: POST_WALLETS
});

const walletsFailure = () => ({
  type: POST_WALLETS_FAIL
});

const setError = (error: string) => {
  return {
    type: SET_ERROR,
    error: {
      message: error
    }
  }
};