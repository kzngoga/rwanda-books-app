import axios from '..';
import {
  SEARCH_BOOKS_SUCCESS,
  SEARCH_BOOKS_FAILED,
  CLEAR_SEARCH,
} from '../../actionTypes';

export default (searchTerm, query, page) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_SEARCH });

    const response = await axios.get(
      `/api/v1/search/${searchTerm}?q=${query}&page=${page}&limit=12`
    );

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: SEARCH_BOOKS_SUCCESS,
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
    dispatch({ type: SEARCH_BOOKS_FAILED, error });
  }
};
