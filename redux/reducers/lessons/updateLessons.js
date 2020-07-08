import {
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAILED,
  CLEAR_UPDATE_LESSON,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LESSON_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case UPDATE_LESSON_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_UPDATE_LESSON:
      return { ...state, status: 'clear' };
    default:
      return state;
  }
};
