import {
  FETCH_LESSON_SUCCESS,
  FETCH_LESSON_FAILED,
  CLEAR_LESSON,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LESSON_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };
    case FETCH_LESSON_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_LESSON:
      return { ...initialState, status: 'clear' };
    default:
      return state;
  }
};
