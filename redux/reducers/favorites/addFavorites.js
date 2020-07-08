import {
  ADD_TO_FAVORITES_SUCCESS,
  ADD_TO_FAVORITES_FAILED,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case ADD_TO_FAVORITES_FAILED:
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
};
