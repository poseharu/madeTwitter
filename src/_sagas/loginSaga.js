import { takeLatest, put, getContext } from 'redux-saga/effects';
import CommonString from '../api/CommonString';
import Global from '../api/Global';
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  updateProfile, signOut
} from 'firebase/auth';

/**
 * @desc 회원가입 시도 함수
 */
function* tryRegister(action) {
  let { Email, Password } = action;
	
	if(Email && Password) {
    try{
      //true: create account
      //신규 계정 생성에 성공하면 사용자가 자동으로 로그인됩니다.
      const data = yield createUserWithEmailAndPassword(auth, Email, Password);

      //displayName을 초기화시켜줌
      yield updateProfile(data.user, { 
        displayName: 'No Name',
        photoURL: Global.basicImg
      });
      const history = yield getContext('history');
      history.push('/home');
    }
    catch(error){
      //에러에 대한 에러 메세지 반환
      let errorMessage = Global.authErrorMessage(error.code);
      yield put({
        type: CommonString.LOGIN_ERROR_MESSAGE,
        value: errorMessage
      });
    }
  }
}

export function* watchTryRegister() {
  // Take Last Action Only
  yield takeLatest(CommonString.TRY_REGISTER, tryRegister);
};

/**
 * @desc 로그인 시도 함수
 */
function* tryLogin(action) {
  let { Email, Password } = action;
	
	if(Email && Password) {

    try{
      //false: log in
      //이메일과 패스워드를 통해 저장된 계정과 일치하면 로그인함
      yield signInWithEmailAndPassword(auth, Email, Password);
      yield put({
        type: CommonString.LOGIN_SUCCESS,
        value: true
      });
      const history = yield getContext('history');
      history.push('/home');
    }
    catch(error){
      //에러에 대한 에러 메세지 반환
      let errorMessage = Global.authErrorMessage(error.code);
      yield put({
        type: CommonString.LOGIN_ERROR_MESSAGE,
        value: errorMessage
      });
    }
  }
}

export function* watchTryLogin() {
  // Take Last Action Only
  yield takeLatest(CommonString.TRY_LOGIN, tryLogin);
};

function* tryLogout(action){
  yield signOut(auth);
  const history = yield getContext('history');
  history.push('/login');
}

export function* watchTryLogout(){
  yield takeLatest(CommonString.TRY_LOGOUT, tryLogout);
}