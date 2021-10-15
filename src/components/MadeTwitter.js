import React, {useState} from 'react';
import { dbService, storageService } from "../firebase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

//내글 일때 수정, 삭제가능
function MadeTwitter({data, isOwner, userObj}) {
  const [Editing, setEditing] = useState(false);
  const [UpdateText, setUpdateText] = useState(data.text);
  const ProfileImg = userObj.photoURL;

  //mtwitters 콜랙션에서 doc id와 매칭되는 doc가져오기
  const docRef = doc(dbService, "mtwitters", `${data.id}`);

  const onDeleteClick = async() =>{
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if(ok){
      //mtwitters 콜랙션에서 해당 문서 삭제
      await deleteDoc(docRef );
      //첨부 이미지도 있을때 storage에서 파일 삭제
      if(data.attachmentUrl !==""){
        //storage에 해당 경로에 있는 파일 참조
        const fileRef = ref(storageService, data.attachmentUrl)
        //storage에서 해당 파일 삭제
        await deleteObject(fileRef)
      }
    }
  }

  //수정 on/off
  const toggleEditing = () => {
    setEditing(!Editing);
  }

  const onChangeText = (e) =>{
    setUpdateText(e.target.value)
  }

  const onSubmit = async(e) =>{
    e.preventDefault();

    await updateDoc(docRef, {
      text: UpdateText,
    });
    setEditing(false);
  }

  return (
    <div className="mTwitter">
      {Editing ?
          <>
            <form className="container mTwitterEdit" onSubmit={onSubmit}>
              <input 
                className="formInput"
                type="text" 
                placeholder="Edit your text"
                value={UpdateText} 
                onChange={onChangeText} 
                required
              />
              <input className="formBtn" type="submit" value="Update" />
            </form>
            <button className="formBtn cancelBtn" onClick={toggleEditing} >Cancel</button>
          </> :    
          <>
            {ProfileImg && <img style={{left: '-10px'}} src={ProfileImg} alt="attachment" />}
            <h4>{data.text}</h4>
            {data.attachmentUrl && <img src={data.attachmentUrl} alt="attachment" />}
            {isOwner && (
              <div className="mTwitter_actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </>
      }
    </div>
  )
}

export default MadeTwitter;
