import axios, { configUser } from '..';
import {
  FETCH_NEW_BOOKS_SUCCESS,
  FETCH_NEW_BOOKS_FAILED,
} from '../../actionTypes';

export default (page) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/api/v1/books/new-releases?page=${page}&limit=8`,
      await configUser()
    );

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_NEW_BOOKS_SUCCESS,
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
    dispatch({ type: FETCH_NEW_BOOKS_FAILED, error });
  }
};
