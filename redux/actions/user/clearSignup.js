import { CLEAR_SIGNUP } from '../../actionTypes';

export default () => async (dispatch) => {
  dispatch({ type: CLEAR_SIGNUP });
};
