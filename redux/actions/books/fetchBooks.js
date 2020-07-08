import axios, { configAdmin } from '..';
import {
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILED,
  CLEAR_BOOKS,
  CLEAR_REMOVE_BOOK,
} from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_BOOKS });
    dispatch({ type: CLEAR_REMOVE_BOOK });

    const response = await axios.get('/api/v1/admin/books/all', configAdmin);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_BOOKS_SUCCESS,
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
    dispatch({ type: FETCH_BOOKS_FAILED, error });
  }
};
