import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const Friends = (props) => {
  const db = getDatabase();
  const auth = getAuth();

  let [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().acceptId == auth.currentUser.uid ||
          item.val().senderId == auth.currentUser.uid
        ) {
          arr.unshift({ ...item.val(), id: item.key });
        }
      });
      setFriendRequests(arr);
    });
  }, []);

  let handleBlock = (item) => {
    set(push(ref(db, "blockUsers")), {
      block: item.sendername,
      blockid: item.senderId,
      blockby: auth.currentUser.displayName,
      blockbyid: auth.currentUser.uid,
      key: item.id,
    }).then(() => {
      remove(ref(db, "friends/" + item.id));
    });
  };

  return (
    <div className="shadow-md mt-[30px] p-[20px] rounded-[20px]">
      <div>
        <div className="flex justify-between ">
          <h3 className="font-poppins text-black text-xl font-semibold capitalize">
            friends
          </h3>
          <button>...</button>
        </div>

        <div className=" overflow-y-auto max-h-[295px]">
          {/*  */}
          {friendRequests.map((item) => (
            <div className="flex justify-between py-[10px] border-b border-solid last:border-0">
              <div className="flex">
                <div className="w-[55px] h-[55px] rounded-[50%] overflow-hidden">
                  <picture>
                    {/* <img src="images/user2.png" /> */}
                    <img src="images/user2.jpg" />
                  </picture>
                </div>
                <div className="ml-[10px] flex items-center">
                  <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                    {item.acceptId == auth.currentUser.uid
                      ? item.sendername
                      : item.acceptname}
                  </h4>
                  {/* <p className="font-poppins text-msg text-sm font-normal">
                {item.email}
              </p> */}
                </div>
              </div>
              {props.btn ? (
                ""
              ) : (
                <div className="flex items-center">
                  <button
                    onClick={() => handleBlock(item)}
                    className="bg-bl_opacity text-white px-[8px] pb-[3px] rounded font-normal text-md mt-[10px] capitalize"
                  >
                    block
                  </button>
                </div>
              )}
            </div>
          ))}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Friends;
