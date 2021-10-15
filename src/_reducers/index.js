/**
 * combineReducers
 * [리듀서들을 여기서 합침]
 */

import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  login: loginReducer
});

export default rootReducer;