import axios, { configAdmin } from '..';
import {
  ADD_CATEGORIES_SUCCESS,
  ADD_CATEGORIES_FAILED,
} from '../../actionTypes';

export default (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      '/api/v1/admin/books/categories/add',
      payload,
      configAdmin
    );

    const {
      data: { message },
    } = response;
    dispatch({
      type: ADD_CATEGORIES_SUCCESS,
      message,
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
    dispatch({ type: ADD_CATEGORIES_FAILED, error });
  }
};
