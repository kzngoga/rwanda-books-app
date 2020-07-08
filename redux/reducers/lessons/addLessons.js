import { ADD_LESSONS_SUCCESS, ADD_LESSONS_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LESSONS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case ADD_LESSONS_FAILED:
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
};
