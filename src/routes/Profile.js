import React, { useState } from 'react';
import { auth } from "../firebase";
import { signOut, updateProfile } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

function Profile({userObj, refreshUser}) {
  const [NewDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const history = useHistory();
  const onClickLogOut = async(e) =>{
    e.preventDefault();

    await signOut(auth);
    history.push("/");
  }

  const onChange = (event)=>{
    const {
      target: {value}
    } = event;

    setNewDisplayName(value);
  }

  const onSubmit = async(e) =>{
    e.preventDefault();

    //displayName이 수정되었으면 업데이트 처리
    if(userObj.displayName !== NewDisplayName){
      //프로필 이름과 사진을 수정할 수 있음
      // await updateProfile(userObj, { displayName: NewDisplayName });
      await updateProfile(auth.currentUser, { displayName: NewDisplayName });
      //user 데이터를 사용하기 위해 새로고침함
      refreshUser();
    }
  }

  return (
    <div className="container">
      <form className="profileForm" onSubmit={onSubmit}>
        <input 
          className="formInput"
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={NewDisplayName}
        />
        <input 
          className="formBtn addMargin" 
          type="submit" 
          value="Update Profile" 
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onClickLogOut}>
        Log Out
      </span>
    </div>
  )
}

export default Profile;