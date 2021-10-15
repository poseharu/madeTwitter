import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import rootReducer from '../_reducers/index';
import { rootSaga } from '../_sagas/index';

const customHistory = createBrowserHistory();
// 사가 미들웨어를 만듭니다.
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
});
// 리덕스, 사가 미들웨어를 적용
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);
// 루트 사가를 실행해줍니다.
sagaMiddleware.run(rootSaga);
export {store};
