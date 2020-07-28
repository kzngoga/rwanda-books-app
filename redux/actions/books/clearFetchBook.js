import { CLEAR_BOOK } from '../../actionTypes';

export default () => async (dispatch) => {
  dispatch({ type: CLEAR_BOOK });
};
