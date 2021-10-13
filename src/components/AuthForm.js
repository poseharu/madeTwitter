import React, { useState } from 'react';
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  updateProfile
} from 'firebase/auth';

function AuthForm({refreshUser}) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [NewAccount, setNewAccount] = useState(true);
  const [Errer, setErrer] = useState('')

  const onChangeValue = (e) =>{
    const {
      target: {name, value}
    } = e;

    if(name === 'email') setEmail(value);
    else setPassword(value);
  }

  const onSubmit = async(e) => {
    //버튼이 눌러질때 새로고침이벤트가 발생되지 않도록 코드로 막아줌
    e.preventDefault();
    try{
      if(NewAccount){
        //true: create account
        //신규 계정 생성에 성공하면 사용자가 자동으로 로그인됩니다.
        const data = await createUserWithEmailAndPassword(auth, Email, Password);
        //displayName을 초기화시켜줌
        await updateProfile(data.user, { displayName: 'No Name' });
        //user데이터를 사용하기 위해서 새로고침함.
        refreshUser();
      }
      else{
        //false: log in
        //이메일과 패스워드를 통해 저장된 계정과 일치하면 로그인함
        await signInWithEmailAndPassword(auth, Email, Password);
      }
      //로그인이 되면 App.js의 useEffact가 살행되어 onAuthStateChanged 실행됨
    }
    catch(errer){
      setErrer(errer.message);
    }
  };

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
