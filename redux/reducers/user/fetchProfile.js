import { FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        data: action.data,
      };
    case FETCH_PROFILE_FAILED:
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
};
