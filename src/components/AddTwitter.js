import React, { useState, useRef } from 'react';
import { v4 as uuidV4 } from "uuid";
import { storageService, dbService } from "../firebase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function AddTwitter(props) {
  //저장할 글
  const [SendText, setSendText] = useState("");
  //attachment 첨부파일의 이미지파일
  const [Attachment, setAttachment] = useState("");

  //Cloud Firestore 에서 mtwitters란 collection을 참조하기
  const mtwitterCollectionRef = collection(dbService, 'mtwitters');

  const onSubmit = async(e) =>{
    //입력값이 비어 있을때 체크
    if(SendText === "") return;

    e.preventDefault();

    //저장소에 있는 첨부파일 이미지 경로
    let attachmentUrl = "";
    if(Attachment !== ""){
      //파일에 대한 참고를 가짐
      //ref(storage: FirebaseStorage, url?: string): StorageReference
      //url = `${유저아이디명 폴더}/attachment/${사진이름}`
      const fileRef = ref(storageService, `${props.userObj.uid}/attachment/${uuidV4()}`);

      //텍스트화된 이미지를 storage에 업로드하고 처리결과 데이터 반환
      //Promise 이므로 비동기 처리
      const uploadResult = await uploadString(fileRef, Attachment, "data_url");

      //storage에 저장된 파일경로를 반환
      //Promise 이므로 비동기 처리, Obj의 Url 반환함
      //UploadResult.ref: StorageReference
      attachmentUrl = await getDownloadURL(uploadResult.ref);
    }
  
    /*
    * Document Data를 추가
    * text: 내용글
    * createdAt: 생성날짜
    * creatorId: 로그인 유저의 uid
    * attachmentUrl: 첨부 이미지
    */
    const mtwitterData = {
      text: SendText,
      createdAt: Date.now(),
      creatorId: props.userObj.uid,
      attachmentUrl
    }
    //Cloud Firestore에서 Document ID를 자동으로 생성하도록 addDoc() 사용, Promise 이므로 비동기 처리
    await addDoc(mtwitterCollectionRef, mtwitterData);

    //쓴글 초기화
    setSendText("");
    //이미지업로드 초기화
    onClearAttachment();
  }

  const onChange = (e) => {
    setSendText(e.target.value);
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
        setAttachment(result);
      };
      
      //readAsDataURL을 사용하여 파일을 읽음
      reader.readAsDataURL(theFile);
    }
    else{
      //파일업로드를 취소시 프리뷰 초기화
      setAttachment("");
    }  
  }

  //파일 업로드 부분 참조
  const fileInput = useRef();

  //프리뷰 클리어 버튼 클릭시
  const onClearAttachment = () => {
    //파일 업로드 부분의 value 값 초기화
    fileInput.current.value = "";
    //프리뷰 초기화
    setAttachment("");
  }
    
  return (
    <form className="addTwitterForm" onSubmit={onSubmit}>
      <div className="addTwitterInput_container">
        <input 
          className="addTwitterInput_input"
          value={SendText} 
          onChange={onChange} 
          type="text" 
          placeholder="What is on your mind?" 
          maxLength={120} 
        />
        <input className="addTwitterInput_arrow" type="submit" value="&rarr;" />
      </div>
      <label htmlFor="attach-file" className="addTwitterInput_label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input 
        className="addTwitterInput_file"
        id="attach-file"
        type="file" 
        accept="image/*" 
        onChange={onFileChange} 
        ref={fileInput}
      />
      {Attachment && (
        <div className="addTwitterForm_attachment">
          <img src={Attachment} style={{backgroundImage:Attachment}} alt="Img" />
          <div className="addTwitterForm_clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  )
}

export default AddTwitter;