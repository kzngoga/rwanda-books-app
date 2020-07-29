import axios, { configUser } from '..';
import {
  ADD_TO_FAVORITES_SUCCESS,
  ADD_TO_FAVORITES_FAILED,
  SET_TOAST,
} from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    const response = await axios.put(
      `/api/v1/favorites/add/${id}`,
      {},
      await configUser()
    );
    const {
      data: { message, data },
    } = response;
    dispatch({
      type: ADD_TO_FAVORITES_SUCCESS,
      message,
      results: data,
    });
    dispatch({ type: SET_TOAST, payload: 'Book Added to favorites!' });
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
    dispatch({ type: ADD_TO_FAVORITES_FAILED, error });
    dispatch({
      type: SET_TOAST,
      payload: 'FavError:' + ' ' + err.response.data.message,
    });
  }
};
