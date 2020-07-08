import {
  ADD_LESSON_TYPES_SUCCESS,
  ADD_LESSON_TYPES_FAILED,
  CLEAR_ADD_TYPES,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LESSON_TYPES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case ADD_LESSON_TYPES_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_ADD_TYPES:
      return { ...state, status: 'clear' };
    default:
      return state;
  }
};
