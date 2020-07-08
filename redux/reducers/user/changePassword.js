import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, status: 'success', message: action.message };
    case CHANGE_PASSWORD_FAILED:
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
};
