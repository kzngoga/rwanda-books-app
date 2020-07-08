import {
  ADD_CATEGORIES_SUCCESS,
  ADD_CATEGORIES_FAILED,
  CLEAR_ADD_CATEGORIES,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case ADD_CATEGORIES_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_ADD_CATEGORIES:
      return { ...state, status: 'clear' };
    default:
      return state;
  }
};
