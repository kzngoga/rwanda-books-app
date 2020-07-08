import {
  REMOVE_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_FAILED,
  CLEAR_REMOVE_FAVORITES,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_FAVORITES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case REMOVE_FAVORITES_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_REMOVE_FAVORITES:
      return { ...state, status: 'clear' };
    default:
      return state;
  }
};
