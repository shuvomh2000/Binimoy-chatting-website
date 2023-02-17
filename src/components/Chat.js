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
import {
  getStorage,
  ref as Sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
const storage = getStorage();

const Chat = () => {
  const db = getDatabase();
  const auth = getAuth();

  let data = useSelector((state) => state.activeChat.value);

  let [msg, setMsg] = useState("");
  let [img, setImg] = useState("");
  let [singlemsg, setSinglemsg] = useState([]);
  let [groupmsg, setGroupmsg] = useState([]);

  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  let handleSend = () => {
    if (msg == "") {
      console.log("enter msg");
    } else if (data.status == "group") {
      set(push(ref(db, "groupmsg")), {
        whosendid: auth.currentUser.uid,
        whosendname: auth.currentUser.displayName,
        gwhoreceieveid: data.id,
        gwhoreceievename: data.name,
        msg: msg,
        type: "text",
      });
    } else {
      set(push(ref(db, "singlemsg")), {
        whosendid: auth.currentUser.uid,
        whosendname: auth.currentUser.displayName,
        whoreceieveid: data.id,
        whoreceievename: data.name,
        msg: msg,
        type: "text",
      });
    }
    if (img == "") {
      console.log("select image");
    } else {
      const singleImgRef = Sref(storage, "singleImg/" + img.name);

      const uploadTask = uploadBytesResumable(singleImgRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            if (data.status == "gruop") {
              set(push(ref(db, "groupmsg")), {
                whosendid: auth.currentUser.uid,
                whosendname: auth.currentUser.displayName,
                whoreceieveid: data.id,
                whoreceievename: data.name,
                img: downloadURL,
                type: "image",
              });
            } else {
              set(push(ref(db, "singlemsg")), {
                whosendid: auth.currentUser.uid,
                whosendname: auth.currentUser.displayName,
                whoreceieveid: data.id,
                whoreceievename: data.name,
                img: downloadURL,
                type: "image",
              });
            }
          });
        }
      );
    }
  };

  useEffect(() => {
    const groupmsgRef = ref(db, "groupmsg/");
    onValue(groupmsgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().gwhoreceieveid == data.id) {
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
          (item.val().whosendid == auth.currentUser.uid &&
            item.val().whoreceieveid == data.id) ||
          (item.val().whoreceieveid == auth.currentUser.uid &&
            item.val().whosendid == data.id)
        ) {
          arr.push({ ...item.val(), id: item.key });
          console.log(item.val());
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
            {data.status == "group"
              ? groupmsg.map((item) =>
                  item.whosendid == auth.currentUser.uid &&
                  item.gwhoreceieveid == data.id
                    ? (item.type = "text" ? (
                        <div className="p-[10px] bg-primary text-white text-base font-extralight font-poppins max-w-[70%] ml-auto rounded-lg">
                          {item.msg}
                        </div>
                      ) : (
                        <div className="p-[10px]  text-white text-base font-extralight font-poppins max-w-[60%] ml-auto rounded-lg">
                          <img src="images/demu11.jpg" />
                        </div>
                      ))
                    : (item.type = "text" ? (
                        <div className="p-[10px] bg-[#D9D9D9] font-normal text-base font-poppins max-w-[70%] mr-auto rounded-lg">
                          {item.msg}
                        </div>
                      ) : (
                        <div className="p-[10px]  font-normal text-base font-poppins max-w-[60%] mr-auto rounded-lg">
                          <img src="images/demu11.jpg" />
                        </div>
                      ))
                )
              : singlemsg.map((item) =>
                  item.whosendid == auth.currentUser.uid &&
                  item.whoreceieveid == data.id ? (
                    item.type == "text" ? (
                      <div className="p-[10px] bg-primary text-white text-base font-extralight font-poppins max-w-[70%] ml-auto rounded-lg">
                        {item.msg}
                      </div>
                    ) : (
                      <div className="p-[10px]  text-white text-base font-extralight font-poppins max-w-[60%] ml-auto rounded-lg">
                        <img src={item.img} />
                      </div>
                    )
                  ) : item.type == "text" ? (
                    <div className="p-[10px] bg-[#D9D9D9] font-normal text-base font-poppins max-w-[70%] mr-auto rounded-lg">
                      {item.msg}
                    </div>
                  ) : (
                    <div className="p-[10px]  font-normal text-base font-poppins max-w-[60%] mr-auto rounded-lg">
                      <img src={item.img} />
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
            <input
              className="w-[90%] bg-[#D9D9D9] rounded-md px-[10px] py-[5px]"
              type="file"
              onChange={handleImg}
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
