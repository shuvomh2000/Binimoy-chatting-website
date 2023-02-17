import React, { useEffect, useState } from "react";
// import Search from "../Search";
import Search from '../../components/Search'
// import Sidebar from "../Sidebar";
import Sidebar from '../../components/Sidebar'
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import Friends from "../../components/Friends"
import Chat from "../../components/Chat"
import { activeChat } from "../../slices/ActiveChatSlice";
import { useDispatch } from "react-redux";

const Message = () => {
  const db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();

  let [mygrp, setMygrp] = useState([]);
  let [grpmember, setGrpMember] = useState([]);

  useEffect(() => {
    const friendRequestsRef = ref(db, "groups/");
    onValue(friendRequestsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid == auth.currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setMygrp(arr);
    });
  }, []);

  useEffect(() => {
    const friendRequestsRef = ref(db, "groupmembers/");
    onValue(friendRequestsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().userid == auth.currentUser.uid ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setGrpMember(arr);
    });
  }, []);

  let handleSend = (item) => {
    let userInfo = {};
    if (item.adminid == auth.currentUser.uid) {
      userInfo.status = "group";
      userInfo.id = item.id;
      userInfo.name = item.groupName;
    } else {
      userInfo.status = "group";
      userInfo.id = item.gid;
      userInfo.name = item.gName;
    }
    dispatch(activeChat(userInfo));
  };

  return (
    <div className="flex justify-between">
      <div className="w-[14%]">
        <Sidebar active="message" />
      </div>
      <div className="w-[84%] flex justify-between">
        <div className="w-[30%] h-screen flex flex-wrap">
          <div className="w-full">
            {/*  */}
            <Search />
            <Friends btn={true} />
            {/*  */}
            {/* <div className="shadow-md mt-[30px] p-[20px] rounded-[20px]">
              <div className="max-h-[295px] overflow-y-auto">
              </div>
            </div> */}
          </div>
          <div className="w-full">
            <div className="shadow-md p-[20px] rounded-[20px]">
              <div className="max-h-[295px] overflow-y-auto">
                <div className="flex justify-between ">
                  <h3 className="font-poppins text-black text-xl font-semibold capitalize">
                    groups
                    {/* <span className="font-normal text-[16px]">
                      ({grp.length})
                    </span> */}
                  </h3>
                  <button>...</button>
                </div>
                {mygrp.map((item) => (
                  <div>
                    <div className=" overflow-y-auto max-h-[380px]">
                      {/*  */}
                      <div
                        onClick={() => handleSend(item)}
                        className="flex justify-between py-[10px] border-b border-solid last:border-0"
                      >
                        <div className="flex">
                          <div className="w-[55px] h-[55px] rounded-[50%]">
                            <picture>
                              <img src="images/user1.png" />
                            </picture>
                          </div>
                          <div className="ml-[10px] flex items-center">
                            <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                              {item.groupName}
                            </h4>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                  </div>
                ))}
                {grpmember.map((item) => (
                  <div>
                    <div className=" overflow-y-auto max-h-[380px]">
                      {/*  */}
                      <div
                        onClick={() => handleSend(item)}
                        className="flex justify-between py-[10px] border-b border-solid last:border-0"
                      >
                        <div className="flex">
                          <div className="w-[55px] h-[55px] rounded-[50%]">
                            <picture>
                              <img src="images/user1.png" />
                            </picture>
                          </div>
                          <div className="ml-[10px] flex items-center">
                            <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                              {item.gName}
                            </h4>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[67%] shadow-xl border border-solid h-screen p-[30px]">
          <div>
            <div>
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
