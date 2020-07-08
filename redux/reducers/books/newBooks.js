import {
  FETCH_NEW_BOOKS_SUCCESS,
  FETCH_NEW_BOOKS_FAILED,
} from '../../actionTypes';

const initialState = {
  status: '',
  results: [],
  lastFetched: '',
  message: '',
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEW_BOOKS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
        lastFetched: 'releases',
      };
    case FETCH_NEW_BOOKS_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
        lastFetched: 'releases',
      };
    default:
      return state;
  }
};
