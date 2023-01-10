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

const Groups = () => {
  const db = getDatabase();
  const auth = getAuth();

  let [show, setShow] = useState(false);
  let [grp, setGrp] = useState([]);
  let [grpname, setGrpname] = useState("");
  let [grpbio, setGrpbio] = useState("");
  let [grperr, setGrperr] = useState("");

  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().admin == auth.currentUser.uid) {
          arr.unshift({ ...item.val(), id: item.key });
        }
      });
      setGrp(arr);
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
        admin: auth.currentUser.uid,
        adminName: auth.currentUser.displayName,
        date: `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`,
      }).then(() => {
        setShow(false);
      });
    }
  };
  return (
    <>
      <div className="shadow-md p-[20px] rounded-[20px]">
        <div>
          <div className="flex justify-between ">
            <h3 className="font-poppins text-black text-xl font-semibold capitalize">
              my groups <span className="font-normal text-[16px]">({grp.length})</span>
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
              <div className="flex justify-between py-[10px] border-b border-solid last:border-0">
                <div className="flex">
                  <div className="w-[55px] h-[55px] rounded-[50%]">
                    <picture>
                      <img src="images/user1.png" />
                    </picture>
                  </div>
                  <div className="ml-[10px] mt-[7px]">
                    <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                      {item.groupName}
                    </h4>
                    <p className="font-poppins text-msg text-sm font-normal">
                      {item.date}
                    </p>
                  </div>
                </div>
                <p className="font-poppins text-msg text-[10px] font-medium mt-[12px]">
                  Today, 8:56pm
                </p>
              </div>
            ))}
            {/*  */}
          </div>
        </div>
      </div>
      {show && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-dark_opacity z-[9999] flex justify-center">
          <div className="p-[30px] h-[310px] bg-white mt-[30px] rounded-md">
            <h3 className="font-poppins text-primary text-xl font-semibold capitalize mb-[25px]">
              create group
            </h3>
            <div className="relative">
              <input
                className="w-full border-b-2 border-[#e7e7e7] text-[18px] font-medium font-poppins text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px] mb-[20px]"
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
                className="w-full border-b-2 border-[#e7e7e7] text-[18px] font-medium font-poppins text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px] mb-[20px]"
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
      )}
    </>
  );
};

export default Groups;
