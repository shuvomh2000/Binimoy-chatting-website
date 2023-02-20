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
import { BsTrash } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { useSelector } from "react-redux";

const Groups = () => {
  const db = getDatabase();
  const auth = getAuth();
  let dark = useSelector((state) => state.darkMode.value);

  let [show, setShow] = useState(false);
  let [groupusershow, setGroupUserShow] = useState(false);
  let [grp, setGrp] = useState([]);
  let [joingrp, setJoingrp] = useState([]);
  let [grpmember, setGrpMember] = useState([]);
  let [grpmemberreq, setGrpMemberReq] = useState([]);
  let [grpname, setGrpname] = useState("");
  let [grpbio, setGrpbio] = useState("");
  let [grperr, setGrperr] = useState("");

  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid == auth.currentUser.uid) {
          arr.unshift({ ...item.val(), id: item.key });
        }
      });
      setGrp(arr);
    });
  }, []);

  useEffect(() => {
    const groupmembersRef = ref(db, "groupmembers/");
    onValue(groupmembersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // console.log(item.val())
        if (item.val().userid == auth.currentUser.uid) {
          arr.unshift({ ...item.val(), id: item.key });
        }
      });
      setJoingrp(arr);
    });
  }, []);

  let handleModal = () => {
    setShow(!show);
    setGrperr("");
    setGrpname("");
    setGrpbio("");
  };

  let handleCreate = () => {
    if (grpname == "") {
      setGrperr("enter group name");
    }

    if (grpname) {
      set(push(ref(db, "groups")), {
        groupName: grpname,
        groupTag: grpbio,
        adminid: auth.currentUser.uid,
        adminName: auth.currentUser.displayName,
        date: `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`,
      }).then(() => {
        setShow(false);
      });
    }
  };

  let handleGroupDelete = (item) => {
    if (item.admin == auth.currentUser.uid) {
      remove(ref(db, "groups/" + item.id));
    }
  };

  let handleGroupUserShow = (item) => {
    setGroupUserShow(!groupusershow);
    const groupJoinRequestRef = ref(db, "groupJoinRequest/");
    onValue(groupJoinRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((gitem) => {
        if (item.id == gitem.val().gid) {
          arr.unshift({ ...gitem.val(), id: gitem.key });
        }
      });
      setGrpMemberReq(arr);
    });

    const groupmembersRef = ref(db, "groupmembers/");
    onValue(groupmembersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((gitem) => {
        if (
          auth.currentUser.uid !== gitem.val().userid &&
          gitem.val().gid == item.id
        ) {
          arr.unshift({ ...gitem.val(), id: gitem.key });
        }
      });
      setGrpMember(arr);
    });
  };

  let handleJoinRequestCancel = (item) => {
    remove(ref(db, "groupJoinRequest/" + item.id));
  };

  let handleJoinRequestAccept = (item) => {
    set(push(ref(db, "groupmembers")), {
      adminid: item.adminid,
      adminName: item.adminName,
      gName: item.gname,
      gid: item.gid,
      gtag: item.gtag,
      userid: item.userid,
      userName: item.username,
      userProfile: item.userprofile,
      key: item.id,
    }).then(() => {
      remove(ref(db, "groupJoinRequest/" + item.id));
    });
  };

  let handleLeave = (item) => {
    remove(ref(db, "groupmembers/" + item.id));
  };
  return (
    <>
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
              my groups
              {/* <span className="font-normal text-[16px]">({grp.length})</span> */}
            </h3>
            <button
              onClick={handleModal}
              className="bg-primary text-white px-[8px] pb-[3px] rounded font-normal text-md mt-[10px] capitalize"
            >
              create group
            </button>
          </div>

          <div className=" overflow-y-auto max-h-[380px]">
            {/*  */}
            {grp.map((item) => (
              <div
                className={`group duration-300 flex justify-between py-[10px] border-b border-solid ${
                  !dark && "border-bl_opacity"
                }`}
              >
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
                    <p className="font-poppins text-msg text-sm font-normal">
                      admin:{item.adminName}
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-[10px] items-center">
                  <button
                    onClick={() => handleGroupDelete(item)}
                    className="hidden group-hover:block ease-in-out text-red w-[25px] h-[25px] rounded font-normal text-xl  capitalize flex justify-center items-center"
                  >
                    <BsTrash />
                  </button>
                  <button
                    onClick={() => handleGroupUserShow(item)}
                    className="text-white bg-primary w-[25px] h-[25px] rounded font-normal text-[18px]  capitalize flex justify-center items-center"
                  >
                    <MdOutlineManageAccounts />
                  </button>
                </div>
              </div>
            ))}
            {joingrp.map((item) => (
              <div
                className={`group duration-300 flex justify-between py-[10px] border-b border-solid last:border-0 ${
                  !dark && "border-bl_opacity"
                }`}
              >
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
                      {item.gName}
                    </h4>
                    <p className="font-poppins text-msg text-sm font-normal">
                      admin:{item.adminName}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* another */}
            {/*  */}
          </div>
        </div>
      </div>
      {show && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-dark_opacity z-[9999] flex justify-center">
          <div>
            <div
              className={`p-[30px] mt-[30px] rounded-md  ${
                dark ? "bg-white" : "bg-black border border-white"
              }`}
            >
              <h3 className="font-poppins text-primary text-xl font-semibold capitalize mb-[25px] text-center">
                create group
              </h3>
              <div className="relative">
                <input
                  className={`px-[5px] w-full border-b-2 border-[#e7e7e7] text-[18px] font-medium font-poppins   
                placeholder:text-sm placeholder:font-normal placeholder:font-nunito pb-[10px] mb-[20px] ${
                  dark
                    ? "bg-white placeholder:text-heading text-heading"
                    : "bg-black border border-wh_opacity placeholder:text-wh_opacity text-white"
                }`}
                  type="text"
                  placeholder="group name"
                  onChange={(e) => setGrpname(e.target.value)}
                />
                {grperr ? (
                  <div className="bg-red px-[5px] py-[2px] rounded mt-[-25px] absolute left-0 bottom-0 w-full">
                    <h3 className="text-white font-normal font-poppins text-sm">
                      {grperr}
                    </h3>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="relative">
                <input
                  className={`px-[5px] w-full border-b-2 border-[#e7e7e7] text-[18px] font-medium font-poppins  
                placeholder:text-sm placeholder:font-normal  placeholder:font-nunito pb-[10px] mb-[20px]  ${
                  dark
                    ? "bg-white placeholder:text-heading text-heading"
                    : "bg-black border border-wh_opacity placeholder:text-wh_opacity text-white"
                }`}
                  type="text"
                  placeholder="group bio"
                  onChange={(e) => setGrpbio(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-x-2.5 w-full">
                  <button
                    onClick={handleCreate}
                    className="w-1/2 text-[18px] font-medium font-nunito py-[8px] px-[6px] bg-primary text-white capitalize mt-[30px]"
                  >
                    create
                  </button>
                  <button
                    onClick={handleModal}
                    className="w-1/2 text-[18px] font-medium font-nunito py-[8px] px-[6px] bg-red text-white capitalize mt-[30px]"
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  */}
      {groupusershow && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-dark_opacity z-[9999] flex justify-center">
          <div>
            <div
              className={`p-[30px] max-h-[90vh] mt-[30px] rounded-md ${
                dark ? "bg-white" : "bg-black border border-white"
              }`}
            >
              <div className="flex gap-x-[55px] justity-between border-b border-solid">
                <h3 className="font-poppins text-primary text-xl font-semibold capitalize mb-[25px] text-center">
                  group manage user
                </h3>
                <button
                  onClick={() => setGroupUserShow(!groupusershow)}
                  className={`w-[25px] h-[25px] rounded font-normal text-[18px]  capitalize flex justify-center items-center ${
                    dark ? "text-heading" : "text-white"
                  }`}
                >
                  <RxCross1 />
                </button>
              </div>
              {grpmemberreq == "" && grpmember == "" ? (
                <h4 className="font-poppins text-bl_opacity text-sm font-semibold capitalize">
                  group is empty...
                </h4>
              ) : (
                <>
                  {grpmemberreq.map((item) => (
                    <div
                      className={`flex justify-between py-[10px] border-b border-solid ${
                        !dark && "border-bl_opacity"
                      }`}
                    >
                      <div className="flex">
                        <div className="w-[25px] h-[25px] rounded-[50%] overflow-hidden">
                          <picture>
                            <img src={item.userprofile} />
                          </picture>
                        </div>
                        <div className="ml-[10px] flex items-center">
                          <h4
                            className={`font-poppins text-black text-sm font-semibold capitalize ${
                              dark ? "text-black" : "text-white"
                            }`}
                          >
                            {item.username}
                          </h4>
                        </div>
                      </div>
                      <div className="flex gap-x-[10px]  items-center">
                        <button
                          onClick={() => handleJoinRequestCancel(item)}
                          className=" bg-red text-white w-[25px] h-[25px] flex justify-center items-center rounded font-normal text-xl capitalize "
                        >
                          <RxCross2 />
                        </button>
                        <button
                          onClick={() => handleJoinRequestAccept(item)}
                          className="bg-green text-white w-[25px] h-[25px] rounded font-normal text-xl  capitalize flex justify-center items-center"
                        >
                          <AiOutlineCheck />
                        </button>
                      </div>
                    </div>
                  ))}
                  {grpmember.map((item) => (
                    <div className="group flex justify-between py-[10px] border-b border-solid last:border-0">
                      <div className="flex">
                        <div className="w-[25px] h-[25px] rounded-[50%] overflow-hidden">
                          <picture>
                            <img src={item.userProfile} />
                          </picture>
                        </div>
                        <div className="ml-[10px] flex items-center">
                          <h4
                            className={`font-poppins text-black text-sm font-semibold capitalize ${
                              dark ? "text-black" : "text-white"
                            }`}
                          >
                            {item.userName}
                          </h4>
                        </div>
                      </div>
                      <div className="flex gap-x-[10px]  items-center">
                        <button
                          onClick={() => handleLeave(item)}
                          className="hidden group-hover:block ease-in-out text-red w-[25px] h-[25px] rounded font-normal text-xl  capitalize flex justify-center items-center"
                        >
                          <BiExit />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/*  */}
    </>
  );
};

export default Groups;
