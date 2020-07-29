import { CLEAR_TOAST } from '../../actionTypes';

export default () => async (dispatch) => {
  dispatch({ type: CLEAR_TOAST });
};
