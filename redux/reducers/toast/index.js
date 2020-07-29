import { SET_TOAST, CLEAR_TOAST } from '../../actionTypes';

const initialState = {
  message: null,
};

const toast = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOAST:
      return { message: action.payload };
    case CLEAR_TOAST:
      return initialState;
    default:
      return state;
  }
};

export default { toast };
