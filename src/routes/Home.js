import React, { useState, useEffect } from 'react';
import { dbService } from "../firebase";
import { 
  collection, query, 
  onSnapshot, orderBy
} from "firebase/firestore";

import MadeTwitter  from '../components/MadeTwitter';
import AddTwitter from '../components/AddTwitter';

function Home(props) {
  //twitter 리스트
  const [Mteitters, setMteitters] = useState([]);

  useEffect(() => {
    //Cloud Firestore 에서 mtwitters란 collection을 참조하기
    const mtwitterCollectionRef = collection(dbService, 'mtwitters');

    //쿼리 작성, where(), orderBy() 포함해서 조건을 넣을수 있음
    const q = query(
      mtwitterCollectionRef,
      orderBy("createdAt", "desc")
    );
    //실시간 반영을 위해 사용
    //스냅샷 핸들러는 문서의 추가, 삭제, 수정 등 쿼리 결과가 변경될 때마다 새 쿼리 스냅샷을 수신합니다.
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMteitters(nweetArr);
    });
  }, []);

  return (
    <div className="container">
      <AddTwitter userObj={props.userObj}/>
      <div style={{ marginTop: 30 }}>
        {Mteitters.map((data) =>(
          <MadeTwitter 
            key={data.id}
            data={data} 
            isOwner={data.creatorId === props.userObj.uid}/>
        ))}
      </div>
    </div>
  )
}

export default Home;
