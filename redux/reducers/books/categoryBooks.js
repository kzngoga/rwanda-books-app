import {
  FETCH_CATEGORY_BOOKS_SUCCESS,
  FETCH_CATEGORY_BOOKS_FAILED,
  CLEAR_FETCH_CATEGORY,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_BOOKS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };
    case FETCH_CATEGORY_BOOKS_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_FETCH_CATEGORY:
      return { ...initialState, status: 'clear_category_books' };
    default:
      return state;
  }
};
