import {
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILED,
  CLEAR_BOOKS,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };
    case FETCH_BOOKS_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_BOOKS:
      return { ...initialState, status: 'clear' };
    default:
      return state;
  }
};
