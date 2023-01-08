import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import {RxCross2} from "react-icons/rx"
import {AiOutlineCheck} from "react-icons/ai"

const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();

  let [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    // const starCountRef = ref(db, "friendrequest/" );
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   updateStarCount(postElement, data);
    // });

    const friendRequestsRef = ref(db, "friendrequest/");
    onValue(friendRequestsRef, (snapshot) => {

    let arr = [];
    snapshot.forEach((item) => {
      if (item.val().recever_id == auth.currentUser.uid) {
        arr.push(item.val());
      }
    });
    setFriendRequests(arr);
    });
  }, []);

  return (
    <div className="shadow-md p-[20px] rounded-[20px]">
      <div className="flex justify-between ">
        <h3 className="font-poppins text-black text-xl font-semibold capitalize">
          friend request
        </h3>
        <button>...</button>
      </div>
      {friendRequests.map((item) => (
        <div>
          <div className=" overflow-y-auto max-h-[380px]">
            {/*  */}
            <div className="flex justify-between py-[10px] border-b border-solid">
              <div className="flex">
                <div className="w-[55px] h-[55px] rounded-[50%]">
                  <picture>
                    <img src="images/user1.png" />
                  </picture>
                </div>
                <div className="ml-[10px] flex items-center">
                  <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                    {item.sender_name}
                  </h4>
                  {/* <p className="font-poppins text-msg text-sm font-normal">
                    Dinner
                  </p> */}
                </div>
              </div>
              <div className="flex gap-x-[10px]  items-center">
                <button className=" bg-red text-white w-[25px] h-[25px] flex justify-center items-center rounded font-normal text-xl capitalize ">
                  <RxCross2/>
                </button>
                <button className="bg-green text-white w-[25px] h-[25px] rounded font-normal text-xl  capitalize flex justify-center items-center">
                <AiOutlineCheck/>
                </button>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
