import { SET_NAV_RESET } from '../../actionTypes';

const initialState = {
  reset: 'initial',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV_RESET:
      return {
        reset: action.payload,
      };
    default:
      return state;
  }
};
