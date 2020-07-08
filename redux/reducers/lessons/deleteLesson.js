import {
  REMOVE_LESSON_SUCCESS,
  REMOVE_LESSON_FAILED,
  CLEAR_REMOVE_LESSON,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_LESSON_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case REMOVE_LESSON_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_REMOVE_LESSON:
      return { ...state, status: 'clear' };
    default:
      return state;
  }
};
