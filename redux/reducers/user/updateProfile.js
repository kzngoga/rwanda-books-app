import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  CLEAR_UPDATE_PROFILE,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };
    case UPDATE_PROFILE_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_UPDATE_PROFILE:
      return { ...initialState, status: 'clear_signup' };
    default:
      return state;
  }
};
