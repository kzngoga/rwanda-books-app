import {
  FETCH_LESSONS_SUCCESS,
  FETCH_LESSONS_FAILED,
  CLEAR_LESSONS,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LESSONS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };
    case FETCH_LESSONS_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_LESSONS:
      return { ...initialState, status: 'clear' };
    default:
      return state;
  }
};
