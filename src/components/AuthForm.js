import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {registerUser, loginUser } from '../_actions/user_action';
import Global from '../api/Global';

function AuthForm({refreshUser}) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [NewAccount, setNewAccount] = useState(true);
  const [Errer, setErrer] = useState('');

  const loginMessage = useSelector(state => state.login.loginMessage);
  const dispatch = useDispatch();

  useEffect(()=>{
    setErrer(loginMessage)
  }, [loginMessage])

  const onChangeValue = (e) =>{
    const {
      target: {name, value}
    } = e;

    if(name === 'email') setEmail(value);
    else setPassword(value);
  }

  const onSubmit = (e) => {
    //버튼이 눌러질때 새로고침이벤트가 발생되지 않도록 코드로 막아줌
    e.preventDefault();

    const emailCheck = Global.checkEmail(Email);
    const passwordCheck = Global.CheckPassword(Password);
    if(emailCheck !== '') {
      setErrer(emailCheck);
    }
    else if(passwordCheck !== '') {
      setErrer(passwordCheck);
    }
    else{
      const data = {Email, Password};
      if(NewAccount){
        //회원가입
        dispatch(registerUser(data));
      }
      else{
        //로그인
        dispatch(loginUser(data));
      }
    }
  }

  //로그인을 할지 계정생성할지를 선택
  const toggleAccount = ()=>{
    setNewAccount(!NewAccount);
  }

  return (
    <>
      <form className="container" onSubmit={onSubmit}>
        <input 
          className="authInput"
          name="email" 
          type="text" 
          placeholder="Email" 
          required 
          value={Email} 
          onChange={onChangeValue}
        />
        <input 
          className="authInput"
          name="password" 
          type="password" 
          placeholder="Password" 
          required 
          value={Password} 
          onChange={onChangeValue}
        />
        <input 
          className="authInput authSubmit" 
          type="submit" 
          value={NewAccount ? "Create Account" :"Log In"} 
        /><br/>
        {Errer && <span className="authError">{Errer}</span>}
      </form>
      <span className="authSwitch" onClick={toggleAccount}>
        {NewAccount ? "Sign in": "Create Account"}
      </span>
    </>
  )
}

export default AuthForm;
