import React, { useState } from 'react';
import { auth, storageService } from "../firebase";
import { v4 as uuidV4 } from "uuid";
import { ref, uploadString, getDownloadURL, deleteObject } from "@firebase/storage";
import { updateProfile } from 'firebase/auth';
// import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logoutUser } from '../_actions/user_action';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Profile({userObj, refreshUser}) {
  const [NewDisplayName, setNewDisplayName] = useState(userObj.displayName===null?"":userObj.displayName);
  const [ProfileImg, setProfileImg] = useState(userObj.photoURL);

  const dispatch = useDispatch();

  // const history = useHistory();
  const onClickLogOut = async(e) =>{
    e.preventDefault();

    dispatch(logoutUser());
    // await signOut(auth);
    // history.push("/");
  }

  const onChange = (event)=>{
    const {
      target: {value}
    } = event;

    setNewDisplayName(value);
  }

  const onFileChange = (e)=>{
    const {
      target:{files}
    } = e;
    //input에 있는 모든 파일중에 첫번째 파일만 받도록함
    const theFile = files[0];
    const reader = new FileReader();

    if(files.length !== 0){
      //reader에 event listner를 추가하여 파일 로딩이 끝났을때 프리뷰 이미지 정보를 제공
      reader.onloadend = (finishedEvent) =>{
        const {
          currentTarget:{result}
        } = finishedEvent;

        // console.log(result);
        //텍스트화된 이미지를 state에 저장
        setProfileImg(result);
      };
      
      //readAsDataURL을 사용하여 파일을 읽음
      reader.readAsDataURL(theFile);
    }
    else{
      //파일업로드를 취소시 프리뷰 초기화
      setProfileImg(userObj.photoURL);
    }  
  }

  const onSubmit = async(e) =>{
    e.preventDefault();

    //수정여부 판단
    let isUpdateFlag = false;

    //프로필 이름이 수정되었을때
    if(NewDisplayName !=="" && userObj.displayName !== NewDisplayName){
      
      await updateProfile(auth.currentUser, { 
        displayName: NewDisplayName
      });

      isUpdateFlag = true;
    }
    //프로필 사진이 수정되었을때
    if(userObj.photoURL !== ProfileImg){
      //저장소에 프로필 이미지 파일이 저장되어 있을때
      if(userObj.photoURL.indexOf("profileImg") !== -1){
        //storage에서 해당 프로필 이미지파일 삭제
        console.log("profile del!!");
        await deleteObject(ref(storageService, userObj.photoURL));
      }

      //url = `${유저아이디명 폴더}/profileImg/${사진이름}`
      const fileRef = ref(storageService, `${userObj.uid}/profileImg/${uuidV4()}`);
      //텍스트화된 이미지를 storage에 업로드하고 처리결과 데이터 반환
      const uploadResult = await uploadString(fileRef, ProfileImg, "data_url");
      //storage에 저장된 파일경로를 반환
      const getPhotoURL = await getDownloadURL(uploadResult.ref);

      await updateProfile(auth.currentUser, { 
        photoURL: getPhotoURL 
      });

      isUpdateFlag = true;
    }
    
    if(isUpdateFlag){
      console.log("수정완료");
      //user 데이터를 사용하기 위해 새로고침함
      refreshUser();
    }
    else{
      alert("수정사항이 없습니다.");
    }
  }

  return (
    <div className="container">
      <img className="profileImg" src={ProfileImg} alt="프로필이미지" />
      <form className="profileForm" onSubmit={onSubmit}>
        <label htmlFor="attach-file" className="addTwitterInput_label updataImgBtn">
          <span>프로필 이미지 수정</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input 
          className="addTwitterInput_file"
          id="attach-file"
          type="file" 
          accept="image/*" 
          onChange={onFileChange} 
        />
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