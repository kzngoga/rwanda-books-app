import {
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAILED,
  CLEAR_FAVORITES,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };
    case FETCH_FAVORITES_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_FAVORITES:
      return { ...initialState, status: 'clear' };
    default:
      return state;
  }
};
