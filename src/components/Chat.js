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
import {ImAttachment} from "react-icons/im"


const Chat = () => {
  const storage = getStorage();                
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
      <div className="relative mb-[15px] xl:mb-[0px]">
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
        <div className="w-full h-[64vh] xl:h-[70vh] overflow-y-auto px-[10px] mt-[10px] mb-[45px]">
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
                        <div className="max-w-[60%] ml-auto ">
                          <img src="images/demu11.jpg" />
                        </div>
                      ))
                    : (item.type = "text" ? (
                        <div className=" max-w-[70%] mr-auto">
                          <h6 className="font-normal text-[10px] font-poppins">{item.whosendname}</h6>
                          <h6 className="p-[10px] bg-[#D9D9D9] font-normal text-base font-poppins rounded-lg">{item.msg}</h6>
                        </div>
                      ) : (
                        <div className="max-w-[60%] mr-auto ">
                           <h6 className="font-normal text-[10px] font-poppins">{item.whosendname}</h6>
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
          <div className="flex justify-between absolute bottom-[-45px] left-0 w-full">
           <div className="w-[90%] relative">
           <input
              placeholder="type a message..."
              className="w-full bg-[#D9D9D9] rounded-md pl-[10px] pr-[40px] py-[5px]"
              onChange={handleMsg}
            />
            <label for="file">
              <ImAttachment className="absolute top-0 right-[2%] top-[50%] translate-y-[-50%] text-primary"/>
            </label>
            <input
              className="w-[90%] bg-[#D9D9D9] rounded-md px-[10px] py-[5px] hidden"
              type="file"
              onChange={handleImg}
              id="file"
            />
           </div>
            
            <div className="w-[8%]">
            <button
              onClick={handleSend}
              className="bg-primary text-white w-full h-[33px] rounded font-normal text-[14px] xl:text-xl  capitalize flex justify-center items-center"
            >
              <IoMdSend />
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
