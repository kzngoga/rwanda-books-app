import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  CLEAR_CATEGORIES,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };
    case FETCH_CATEGORIES_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_CATEGORIES:
      return { ...initialState, status: 'clear' };
    default:
      return state;
  }
};
