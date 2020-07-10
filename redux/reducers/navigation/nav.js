import {
  SET_CURRENT_SCREEN,
  PUSH_NAVIGATION,
  POP_NAVIGATION,
  SET_STACK_VALUE,
} from '../../actionTypes';

const initialState = {
  currentScreen: { screen: null, title: null },
  prevScreen: { screen: null, title: null },
  setStack: true,
  screenStack: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SCREEN:
      return {
        ...state,
        prevScreen: state.currentScreen,
        currentScreen: action.payload,
      };

    case SET_STACK_VALUE:
      return {
        ...state,
        setStack: action.payload,
      };

    case PUSH_NAVIGATION:
      let pushStack = state.screenStack;
      let newSetStack = state.setStack;
      if (state.setStack) {
        pushStack.push(state.currentScreen);
      } else {
        newSetStack = true;
      }
      return {
        ...state,
        screenStack: pushStack,
        setStack: newSetStack,
      };

    case POP_NAVIGATION:
      let popStack = state.screenStack;
      popStack.pop();
      return {
        ...state,
        screenStack: popStack,
      };

    default:
      return state;
  }
};
