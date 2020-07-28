import { CLEAR_READ_BOOK } from '../../actionTypes';

export default () => async (dispatch) => {
  dispatch({ type: CLEAR_READ_BOOK });
};
