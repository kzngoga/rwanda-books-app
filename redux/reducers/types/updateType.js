import {
  UPDATE_LESSON_TYPES_SUCCESS,
  UPDATE_LESSON_TYPES_FAILED,
  CLEAR_UPDATE_TYPES,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LESSON_TYPES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case UPDATE_LESSON_TYPES_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_UPDATE_TYPES:
      return { ...state, status: 'clear' };
    default:
      return state;
  }
};
