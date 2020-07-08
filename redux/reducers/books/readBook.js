import {
  READ_BOOK_SUCCESS,
  READ_BOOK_FAILED,
  CLEAR_READ_BOOK,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case READ_BOOK_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case READ_BOOK_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_READ_BOOK:
      return { ...initialState, status: 'clear_read' };
    default:
      return state;
  }
};
