import {
  SINGLE_BOOK_SUCCESS,
  SINGLE_BOOK_FAILED,
  CLEAR_BOOK,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_BOOK_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };
    case SINGLE_BOOK_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_BOOK:
      return { ...initialState, status: 'clear_fetch_book' };
    default:
      return state;
  }
};
