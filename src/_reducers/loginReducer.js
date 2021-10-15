import CommonString from "../api/CommonString";

/**
 * @desc [로그인 관련 리듀서]
 */
// Initial State
const initialState = {
  isLogin: false,
  loginMessage: ""
};
  
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CommonString.LOGIN_SUCCESS: {
      return {
        ...state,
        isLogin: action.value,
        loginMessage: ""
      };
    }
    case CommonString.LOGIN_ERROR_MESSAGE: {
      return {
        ...state,
        loginMessage: action.value
      }
    }
    default: {
      return state
    }
  }
};// Exports

export default loginReducer;