import { combineReducers } from 'redux';

import user from './user';
import books from './books';
import rating from './rating';
import favorites from './favorites';
import types from './types';
import lessons from './lessons';
import categories from './categories';

export default combineReducers({
  ...books,
  ...user,
  ...favorites,
  ...rating,
  ...types,
  ...lessons,
  ...categories,
});
