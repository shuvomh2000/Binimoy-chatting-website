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
import { useSelector } from "react-redux";

const GroupList = () => {
  const db = getDatabase();
  const auth = getAuth();
  let dark = useSelector((state) => state.darkMode.value);

  let [grp, setGrp] = useState([]);
  let [grpitem, setGrpItem] = useState([]);
  let [joinbtn, setJoinbtn] = useState([]);
  let [grpmember, setGrpMember] = useState([]);

  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid !== auth.currentUser.uid) {
          arr.unshift({ ...item.val(), id: item.key });
        }
      });
      setGrp(arr);
    });
  }, []);

  // useEffect(()=>{
  //   grpmember.map((item)=>{
  //     grp.map((gitem)=>{
  //         if(gitem.id !== item.gid){
  //           let arr = []
  //           arr.push(gitem)
  //           setGrpItem(arr)
  //         }else{
  //           console.log("mile nai")
  //         }
  //     })
  //   })
  // },[])

  useEffect(() => {
    const groupJoinRequestRef = ref(db, "groupJoinRequest/");
    onValue(groupJoinRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.unshift(item.val().gid + item.val().userid);
      });
      setJoinbtn(arr);
    });
  }, []);

  useEffect(() => {
    const groupmembersRef = ref(db, "groupmembers/");
    onValue(groupmembersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.unshift({ ...item.val(), id: item.key });
      });
      setGrpMember(arr);
    });
  }, []);

  let handleGroupJoinRequest = (item) => {
    set(push(ref(db, "groupJoinRequest")), {
      adminid: item.adminid,
      adminName: item.adminName,
      gid: item.id,
      gname: item.groupName,
      gtag: item.groupTag,
      userid: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      userprofile: auth.currentUser.photoURL,
      btncheck: item.id + auth.currentUser.uid,
    });
  };

  return (
    <div
      className={`shadow-md p-[20px] rounded-[20px] ${
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
            groups list
          </h3>
          <button className={`${dark ? "text-black" : "text-white"}`}>
            ...
          </button>
        </div>

        <div className=" overflow-y-auto max-h-[380px]">
          {/*  */}
          {grp.map((item) => (
            <div className={`flex justify-between py-[10px] border-b border-solid ${
              !dark && "border-bl_opacity"
            }`}>
              <div className="flex">
                <div className="w-[55px] h-[55px] rounded-[50%]">
                  <picture>
                    <img src="images/user1.png" />
                  </picture>
                </div>
                <div className="ml-[10px] mt-[7px]">
                  <h4
                    className={`font-poppins text-black text-sm font-semibold capitalize ${
                      dark ? "text-black" : "text-white"
                    }`}
                  >
                    {item.groupName}
                  </h4>
                  <p className="font-poppins text-msg text-[10px] font-normal">
                    admin:{item.adminName}
                  </p>
                </div>
              </div>
              <div>
                {joinbtn.includes(item.id + auth.currentUser.uid) ? (
                  <button className="bg-bl_opacity text-white px-[8px] pb-[3px] rounded font-normal text-md mt-[10px] capitalize">
                    pending
                  </button>
                ) : (
                  <button
                    onClick={() => handleGroupJoinRequest(item)}
                    className="bg-primary text-white px-[8px] pb-[3px] rounded font-normal text-md mt-[10px] capitalize"
                  >
                    join
                  </button>
                )}
              </div>
            </div>
          ))}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default GroupList;
