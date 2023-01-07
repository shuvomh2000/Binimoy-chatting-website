import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  let [userList, setUserList] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item)=>{
        if(item.key !== auth.currentUser.uid){
          arr.push(item.val())
        }
      })
      setUserList(arr)
      console.log(arr)
    });
  }, []);

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
          {userList.map((item)=>(
            <div className="flex justify-between py-[10px] border-b border-solid">
            <div className="flex">
              <div className="w-[55px] h-[55px] rounded-[50%] overflow-hidden">
                <picture>
                  <img src={item.photoURL} />
                </picture>
              </div>
              <div className="ml-[10px] mt-[7px]">
                <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                  {item.name}
                </h4>
                {/* <p className="font-poppins text-msg text-sm font-normal">
                  {item.email}
                </p> */}
              </div>
            </div>
            <div>
              <button className="bg-primary text-white px-[8px] pb-[3px] rounded font-normal text-xl mt-[10px]">
                <p>+</p>
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
