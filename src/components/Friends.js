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
import { activeChat } from "../slices/ActiveChatSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Friends = (props) => {
  const db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();
  let dark = useSelector((state) => state.darkMode.value);

  let [friends, setFriends] = useState([])
  let [show, setShow] = useState(false);

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
      let userInfo = {};
      if (arr[0].acceptId == auth.currentUser.uid) {
        userInfo.status = "single";
        userInfo.id = arr[0].senderId;
        userInfo.name = arr[0].sendername;
      } else {
        userInfo.status = "single";
        userInfo.id = arr[0].acceptId;
        userInfo.name = arr[0].acceptname;
      }
      dispatch(activeChat(userInfo));
      setFriends(arr);
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

  let handleSend = (item) => {
    let userInfo = {};

    if (item.acceptId == auth.currentUser.uid) {
      userInfo.status = "single";
      userInfo.id = item.senderId;
      userInfo.name = item.sendername;
    } else {
      userInfo.status = "single";
      userInfo.id = item.acceptId;
      userInfo.name = item.acceptname;
    }

    dispatch(activeChat(userInfo));
  };

  return (
    <div
      className={`shadow-md mt-[30px] p-[20px] rounded-[20px] ${
        !dark && "shadow-wh_opacity"
      }`}
    >
      <div>
        <div className="flex justify-between ">
          <h3
            className={`font-poppins text-xl font-semibold capitalize ${
              dark ? "text-black" : "text-white"
            }`}
          >
            friends
          </h3>
          <button className={`${dark ? "text-black" : "text-white"}`}>
            ...
          </button>
        </div>

        <div className=" overflow-y-auto max-h-[295px]">
          {/*  */}
          {friends.map((item) => (
            <div
              onClick={() => handleSend(item)}
              className={`flex justify-between py-[10px] border-b border-solid last:border-0 ${
                !dark && "border-bl_opacity"
              }`}
            >
              <div className="flex">
                <div className="w-[55px] h-[55px] rounded-[50%] overflow-hidden">
                  <picture>
                    <img src="images/user2.jpg" />
                  </picture>
                </div>
                <div className="ml-[10px] flex items-center">
                  <h4
                    className={`font-poppins text-black text-sm font-semibold capitalize ${
                      dark ? "text-black" : "text-white"
                    }`}
                  >
                    {item.acceptId == auth.currentUser.uid
                      ? item.sendername
                      : item.acceptname}
                  </h4>
                </div>
              </div>
              {props.btn ? (
                ""
              ) : (
                <div className="flex items-center">
                  <button
                    onClick={() => handleBlock(item)}
                    className={`text-white px-[8px] pb-[3px] rounded font-normal text-md mt-[10px] capitalize ${
                      dark ? "bg-bl_opacity " : "bg-wh_opacity "
                    }`}
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
