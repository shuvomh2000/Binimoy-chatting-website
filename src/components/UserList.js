import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue,set,push  } from "firebase/database";
import { getAuth } from "firebase/auth";
import {AiOutlinePlus} from 'react-icons/ai'

const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  let [userList, setUserList] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid) {
          arr.push({...item.val(),id:item.key});
        }
      });
      setUserList(arr);
    });
  }, []);

  // send request
  let handleSendFriendRequest = (item) => {
    set(push(ref(db, "friendrequest")), {
      sender_id:auth.currentUser.uid,
      sender_name:auth.currentUser.displayName,
      recever_id:item.id,
      recever_name:item.name
    });
  };

  return (
    <div className="shadow-md p-[20px] rounded-[20px]">
      <div>
        <div className="flex justify-between ">
          <h3 className="font-poppins text-black text-xl font-semibold capitalize">
            User List
          </h3>
          <button>...</button>
        </div>

        <div className=" overflow-y-auto max-h-[380px]">
          {/*  */}
          {userList.map((item) => (
            <div className="flex justify-between py-[10px] border-b border-solid">
              <div className="flex">
                <div className="w-[55px] h-[55px] rounded-[50%] overflow-hidden">
                  <picture>
                    {/* <img src="images/user2.png" /> */}
                    <img src={item.photoURL} />
                  </picture>
                </div>
                <div className="ml-[10px] flex items-center">
                  <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                    {item.name}
                    {/* adgfggfd */}
                  </h4>
                  {/* <p className="font-poppins text-msg text-sm font-normal">
                  {item.email}
                </p> */}
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleSendFriendRequest(item)}
                  className="bg-primary text-white w-[25px] h-[25px] flex justify-center items-center rounded font-normal text-xl"
                >
                  <AiOutlinePlus/>
                </button>
              </div>
            </div>
          ))}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default UserList;
