import CommonString from '../api/CommonString';

//회원가입 액션 생성함수 선언
export function registerUser(data) {
  const {Email, Password} = data

  return {
    type: CommonString.TRY_REGISTER,
    Email,
    Password
}
}

//로그인 액션 생성함수 선언
export function loginUser(data) {
  const {Email, Password} = data

  return {
    type: CommonString.TRY_LOGIN,
    Email,
    Password
  }
}

//로그아웃 액션 생성함수 선언
export function logoutUser(){
  //음 로그아웃시 처리인데 멀 처리하면 되지?
  return {
    type: CommonString.TRY_LOGOUT,
    value: ""
  }
}

//유저 인증부분
export function auth() {

  //인증유무 판단해서 어떻게 할까?
  //세션 쿠키에서 인증토큰이 있으면 true, 없으면 false
  let isAuth = false;
  
  return {
      type: CommonString.AUTH_USER,
      value: isAuth
  }
}