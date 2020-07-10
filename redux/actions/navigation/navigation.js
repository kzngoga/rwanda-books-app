import {
  SET_CURRENT_SCREEN,
  PUSH_NAVIGATION,
  POP_NAVIGATION,
  SET_STACK_VALUE,
  SET_NAV_RESET,
} from '../../actionTypes';

export const setCurrentScreen = (payload) => (dispatch) => {
  if (payload !== null) {
    dispatch({
      type: SET_CURRENT_SCREEN,
      payload,
    });
  }
};

export const setStackHandler = (payload) => (dispatch) => {
  dispatch({
    type: SET_STACK_VALUE,
    payload,
  });
};

export const pushNavigation = () => (dispatch) => {
  dispatch({
    type: PUSH_NAVIGATION,
  });
};

export const popNavigation = () => (dispatch) => {
  dispatch({ type: POP_NAVIGATION });
};

export const setNavReset = (payload) => (dispatch) => {
  dispatch({
    type: SET_NAV_RESET,
    payload,
  });
};
