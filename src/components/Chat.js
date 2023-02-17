import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const Chat = () => {
  const db = getDatabase();
  const auth = getAuth();

  let data = useSelector((state) => state.activeChat.value);

  let [msg, setMsg] = useState("");
  let [singlemsg, setSinglemsg] = useState([]);
  let [groupmsg, setGroupmsg] = useState([]);

  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleSend = () => {
    if (msg == "") {
      console.log("enter msg");
    }else if(data.status == "group"){
      set(push(ref(db, "groupmsg")), {
        whosendid: auth.currentUser.uid,
        whosendname: auth.currentUser.displayName,
        gwhoreceieveid: data.id,
        gwhoreceievename: data.name,
        msg: msg,
      })
    } else {
      set(push(ref(db, "singlemsg")), {
        whosendid: auth.currentUser.uid,
        whosendname: auth.currentUser.displayName,
        whoreceieveid: data.id,
        whoreceievename: data.name,
        msg: msg,
      })
    }
  };

  useEffect(() => {
    const groupmsgRef = ref(db, "groupmsg/");
    onValue(groupmsgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val())
        if (
          item.val().whosendid == auth.currentUser.uid &&
          item.val().gwhoreceieveid == data.id 
          // ||
          // item.val().gwhoreceieveid == auth.currentUser.uid &&
          // item.val().whosendid == data.id 
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setGroupmsg(arr);
    });
  }, [data.id]);

  useEffect(() => {
    const singlemsgRef = ref(db, "singlemsg/");
    onValue(singlemsgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().whosendid == auth.currentUser.uid &&
          item.val().whoreceieveid == data.id ||
          item.val().whoreceieveid == auth.currentUser.uid &&
          item.val().whoreceieveid == data.id 
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setSinglemsg(arr);
    });
  }, [data.id]);



  return (
    <>
      <div className="relative">
        {/*  */}
        <div className="flex justify-between pb-[10px] border-b border-solid ">
          <div className="flex">
            <div className="w-[55px] h-[55px] rounded-[50%]">
              <picture>
                <img src="images/user1.png" />
              </picture>
            </div>
            <div className="ml-[10px] flex items-center">
              <div>
                <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                  {/* {item.sender_name} */}
                  {data.name}
                </h4>
                <p className="font-poppins text-msg text-sm font-normal">
                  online
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full h-[70vh] overflow-y-auto px-[10px] my-[10px]">
          <div className="flex flex-col gap-y-[15px]">
            {groupmsg.map((item) =>
              item.whosendid == auth.currentUser.uid &&
              item.gwhoreceieveid == data.id? (
                <div className="p-[10px] bg-primary text-white text-base font-extralight font-poppins max-w-[70%] ml-auto rounded-lg">
                  {item.msg}
                </div>
              ) : (
                <div className="p-[10px] bg-[#D9D9D9] font-normal text-base font-poppins max-w-[70%] mr-auto rounded-lg">
                    {item.msg}
                </div>
              )
            )}
            {singlemsg.map((item) =>
              item.whosendid == auth.currentUser.uid &&
              item.whoreceieveid == data.id? (
                <div className="p-[10px] bg-primary text-white text-base font-extralight font-poppins max-w-[70%] ml-auto rounded-lg">
                  {item.msg}
                </div>
              ) : (
                <div className="p-[10px] bg-[#D9D9D9] font-normal text-base font-poppins max-w-[70%] mr-auto rounded-lg">
                    {item.msg}
                </div>
              )
            )}
          </div>
          <div className="flex justify-between absolute bottom-[-55px] left-0 w-full">
            <input
              placeholder="type a message..."
              className="w-[90%] bg-[#D9D9D9] rounded-md px-[10px] py-[5px]"
              onChange={handleMsg}
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white w-[60px] h-[33px] rounded font-normal text-xl  capitalize flex justify-center items-center"
            >
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
