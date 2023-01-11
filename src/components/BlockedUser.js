import React,{ useEffect, useState } from 'react'
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const BlockedUser = () => {
  const db = getDatabase();
  const auth = getAuth();
  let [blockusers,setBlockusers] = useState([])
  
  useEffect(() => {
    const blockusersRef = ref(db, "blockUsers/");
    onValue(blockusersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key == auth.currentUser.uid) {
          console.log(item.val())
          arr.unshift({ ...item.val(), id: item.key });
        }
        
      });
      setBlockusers(arr);
    });
  }, []);

let handleBlock = (item)=>{
console.log(item)
}

  return (
    <div className="shadow-md p-[20px] rounded-[20px]">
    <div>
      <div className="flex justify-between ">
        <h3 className="font-poppins text-black text-xl font-semibold capitalize">
        Blocked Users
        </h3>
        <button>...</button>
      </div>

      <div className=" overflow-y-auto max-h-[380px]">
          {/*  */}
          {blockusers.map((item) => (
            <div className="flex justify-between py-[10px] border-b border-solid last:border-0">
            <div className="flex">
              <div className="w-[55px] h-[55px] rounded-[50%] overflow-hidden">
                <picture>
                  <img src="images/user2.jpg" />
                </picture>
              </div>
              <div className="ml-[10px] flex items-center">
                <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                  {item.block}
                </h4>
                {/* <p className="font-poppins text-msg text-sm font-normal">
                {item.email}
              </p> */}
              </div>
            </div>
            <div className="flex items-center">
                <button onClick={()=>handleBlock(item)}
                  className="bg-primary text-white px-[8px] pb-[3px] rounded font-normal text-md mt-[10px] capitalize"
                >
                  unblock
                </button>
            </div>
          </div>
          ))}
        {/*  */}
      </div>
    </div>
  </div>
  )
}

export default BlockedUser