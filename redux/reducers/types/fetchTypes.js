import {
  FETCH_LESSON_TYPES_SUCCESS,
  FETCH_LESSON_TYPES_FAILED,
  CLEAR_LESSON_TYPES,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LESSON_TYPES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };
    case FETCH_LESSON_TYPES_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_LESSON_TYPES:
      return { ...initialState, status: 'clear' };
    default:
      return state;
  }
};
