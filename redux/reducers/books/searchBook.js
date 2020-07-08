import {
  SEARCH_BOOKS_SUCCESS,
  SEARCH_BOOKS_FAILED,
  CLEAR_SEARCH,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BOOKS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };
    case SEARCH_BOOKS_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_SEARCH:
      return { ...initialState, status: 'clear_search_books' };
    default:
      return state;
  }
};
