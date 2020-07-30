import axios, { configUser } from '..';
import {
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAILED,
  CLEAR_FAVORITES,
  CLEAR_REMOVE_FAVORITES,
} from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_FAVORITES });
    dispatch({ type: CLEAR_REMOVE_FAVORITES });
    const response = await axios.get('/api/v1/favorites', await configUser());

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_FAVORITES_SUCCESS,
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
    dispatch({ type: FETCH_FAVORITES_FAILED, error });
  }
};
