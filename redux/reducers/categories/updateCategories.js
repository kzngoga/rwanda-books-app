import {
  UPDATE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_FAILED,
  CLEAR_UPDATE_CATEGORIES,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case UPDATE_CATEGORIES_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_UPDATE_CATEGORIES:
      return { ...state, status: 'clear' };
    default:
      return state;
  }
};
