export const SET_ERROR = 'cash/common/SET_ERROR';

interface StateType {
  error: String
}

const initialState: StateType = {
  error: ''
};

export default function reducer(state: StateType = initialState, action: any) {
  switch (action.type) {
    case SET_ERROR:
      return {...state, error: action.error.message};
    default:
      return state;
  }
}

export const setError = (error: string) => ({
  type: SET_ERROR,
  error: {
    message: error
  }
});

