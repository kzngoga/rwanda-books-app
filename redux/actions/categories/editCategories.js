import axios, { configAdmin } from '..';
import {
  UPDATE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_FAILED,
} from '../../actionTypes';

export default (payload, id) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `/api/v1/admin/books/categories/edit/${id}`,
      payload,
      configAdmin
    );

    const {
      data: { message },
    } = response;
    dispatch({
      type: UPDATE_CATEGORIES_SUCCESS,
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
    dispatch({ type: UPDATE_CATEGORIES_FAILED, error });
  }
};
