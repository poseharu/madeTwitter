import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { auth } from "../firebase";
import { updateProfile } from 'firebase/auth';

function App() {
  //false이면 AppRouter를 숨김 근데 왜쓰는지 모르겠음 없어도 지장은 없는데 말이지...
  const [Init, setInit] = useState(false);
  const [UserObj, setUserObj] = useState(null);

  useEffect(() => {
    //사용자의 로그인 상태의 변화를 체크
    //이벤트리스너라고 생각하는게 편함?
    //authState가 변경됨을 감지하고, onAuthStateChanged에 넣어준 callback 함수를 실행할 수 있는 로직입니다.
    auth.onAuthStateChanged((user) => {
      // console.log('onAuthStateChanged');
      // console.log(user);
      if(user){
        //user데이터가 크고 많기때문에 전달전달되는 시간이 지연되고, 불필요한 요소들이 많으므로 쓸것만 재정의
        setUserObj({
          displayName: user.displayName,
          uid:user.uid,
          updateProfile:(args) => updateProfile(user, args)
        })
      }
      else{
        //이걸 안해주면 로그아웃이 안됨...
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  //user를 새로고침하는 기능을 가짐
  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid:user.uid,
      updateProfile:(args) => updateProfile(user, args)
    })
  }

  return (
    <>
      {Init ? (
        <AppRouter 
          refreshUser={refreshUser}
          isLoggedIn={Boolean(UserObj)}
          userObj={UserObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
