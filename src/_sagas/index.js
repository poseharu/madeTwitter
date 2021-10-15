/**
 * @desc [saga 들을 합치는 부분]
 */

 import { all, fork } from 'redux-saga/effects';
 import { watchTryRegister, watchTryLogin, watchTryLogout } from './loginSaga';

 export function* rootSaga () {
  yield all([
    fork(watchTryRegister),
    fork(watchTryLogin),
    fork(watchTryLogout)
  ]);
};