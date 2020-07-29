import {
  RATE_BOOK_SUCCESS,
  RATE_BOOK_FAILED,
  CLEAR_RATING,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RATE_BOOK_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case RATE_BOOK_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_RATING:
      return { ...initialState, status: 'clear_rating' };
    default:
      return state;
  }
};
