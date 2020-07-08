import axios, { configAdmin, configUser } from '..';
import {
  SINGLE_BOOK_SUCCESS,
  SINGLE_BOOK_FAILED,
  CLEAR_BOOK,
  CLEAR_UPDATE_BOOK,
  CLEAR_REMOVE_BOOK,
} from '../../actionTypes';

export default (id, type) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_BOOK });
    dispatch({ type: CLEAR_UPDATE_BOOK });
    dispatch({ type: CLEAR_REMOVE_BOOK });
    let response;
    if (type === 'admin') {
      response = await axios.get(`/api/v1/admin/books/${id}`, configAdmin);
    } else {
      response = await axios.get(`/api/v1/books/${id}`, configUser);
    }

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: SINGLE_BOOK_SUCCESS,
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
    dispatch({ type: SINGLE_BOOK_FAILED, error });
  }
};
