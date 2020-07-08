import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  CLEAR_SIGNUP,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        status: 'signup_success',
        message: action.message,
      };
    case USER_SIGNUP_FAILED:
      return { ...state, status: 'signup_error', error: action.error };
    case CLEAR_SIGNUP:
      return { ...initialState, status: 'clear_signup' };
    default:
      return state;
  }
};
