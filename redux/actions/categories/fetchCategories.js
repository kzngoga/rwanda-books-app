import axios, { configAdmin } from '..';
import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  CLEAR_CATEGORIES,
  CLEAR_ADD_CATEGORIES,
  CLEAR_UPDATE_CATEGORIES,
} from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CATEGORIES });
    dispatch({ type: CLEAR_ADD_CATEGORIES });
    dispatch({ type: CLEAR_UPDATE_CATEGORIES });

    const response = await axios.get('/api/v1/categories/all', configAdmin);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      message,
      results: data,
    });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { status, message },
      } = err.response;
      error = { status, message };
    } else {
      error = {
        status: 500,
        message: err.message,
      };
    }
    dispatch({ type: FETCH_CATEGORIES_FAILED, error });
  }
};
