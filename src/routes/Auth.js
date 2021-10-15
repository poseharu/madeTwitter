import React from 'react';
import { auth } from "../firebase";
import { 
  GoogleAuthProvider, GithubAuthProvider, signInWithPopup
} from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

import AuthForm from '../components/AuthForm';

function Auth({refreshUser}) {
  //소셜 로그인 구현(구글, 깃헙)
  const onSocialClick = async(e) =>{
    if(e.target.name === "google"){
      //구글 로그인시
      const providerGoogle = new GoogleAuthProvider();
      await signInWithPopup(auth, providerGoogle)
      .then((result) => {
        console.log("google login success!!");
        // console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else if(e.target.name === "github"){
      //깃헙로그인시
      //단 깃헙 아이디가 구글로 가입되었을경우는 중복되어 깃헙로그인을 사용할수 없음..
      const providerGithub = new GithubAuthProvider();
      await signInWithPopup(auth, providerGithub)
      .then((result) => {
        console.log("github login success!!");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    //로그인이 되면 App.js의 useEffact가 살행되어 onAuthStateChanged 실행됨
  }
  
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm refreshUser={refreshUser}/>
      <div className="authBtns">
        <button className="authBtn" name="google" onClick={onSocialClick}>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button className="authBtn" name="github" onClick={onSocialClick}>
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  )
}

export default Auth;
