import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getAuth, deleteUser } from "firebase/auth";
import { useSelector } from "react-redux";
import { BiEditAlt } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsCircleHalf, BsTrash } from "react-icons/bs";
import DarkLight from "../../components/DarkLight";

const Setting = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  let [fix,setFix] =useState(false)
  let data = useSelector((state) => state.loginUser.value);
  let dark = useSelector((state) => state.darkMode.value);


  let handleDelete = () => {
    // deleteUser(user).then(() => {
    //     localStorage.removeItem("loginInfo")
    //     localStorage.removeItem("darkMode")
    //   }).catch((error) => {
    //     console.log(error)
    //   });
  };

  return (
    <div className={`xl:flex justify-between ${dark ? "bg-white" : "bg-black"}`}>
        <div className={`w-full block xl:hidden xl:w-[14%]`}>
        <Sidebar active="home" />
      </div>
      <div className="w-full hidden xl:w-[14%] xl:block">
        <Sidebar active="setting" />
      </div>
      <div className="xl:w-[84%] w-full px-[20px] xl:px-[0px]">
        <div>
          <h3 className={`font-poppins text-[16px] font-semibold capitalize mt-[20px] xl:mt-[50px] ${dark ?"text-black":"text-white"}`}>
            profile setting
          </h3>
          <div className="flex p-[25px] ">
            <div className="w-[55px] h-[55px] rounded-[50%] overflow-hidden">
              <picture>
                <img src={data.photo} />
              </picture>
            </div>
            <div className="ml-[10px] flex items-center">
              <h4
                //   ${dark ? "text-black" : "text-white" }
                className={`font-poppins text-[20px] font-semibold capitalize ${dark?"text-black":"text-white"}`}
              >
                {data.name}
              </h4>
            </div>
          </div>
          <div>
            <ul className="flex flex-col px-[25px] xl:px-[50px] py-[20px] gap-y-[15px]">
              <li className="flex gap-x-[15px]">
                <BiEditAlt className="text-primary text-[25px]" />
                <h4 className={`font-poppins text-[18px] font-normal capitalize ${dark?"text-black":"text-white"}`}>
                  edit profile name
                </h4>
              </li>
              <li className="flex gap-x-[15px]">
                <CiImageOn className="text-primary text-[25px]" />
                <h4 className={`font-poppins text-[18px] font-normal capitalize ${dark?"text-black":"text-white"}`}>
                  update profile photo
                </h4>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className={`font-poppins text-[16px] font-semibold capitalize mt-[20px] xl:mt-[50px] ${dark ?"text-black":"text-white"}`}>
            account setting
          </h3>
          <ul className="flex flex-col px-[25px] xl:px-[50px] py-[20px] gap-y-[15px]">
            <li className="flex gap-x-[15px]">
              <RiLockPasswordLine className="text-primary text-[25px]" />
              <h4 className={`font-poppins text-[18px] font-normal capitalize ${dark?"text-black":"text-white"}`}>
                change password
              </h4>
            </li>
            <li className="flex gap-x-[15px]">
              <BsCircleHalf className="text-primary text-[25px]" />
              <h4 className={`font-poppins text-[18px] font-normal capitalize ${dark?"text-black":"text-white"}`}>
                theme{" "}
                <span className="inline-block ml-[15px]">
                  <DarkLight />
                </span>
              </h4>
            </li>
            <li onClick={handleDelete} className="flex gap-x-[15px]">
              <BsTrash className="text-primary text-[25px]" />
              <h4 className={`font-poppins text-[18px] font-normal capitalize ${dark?"text-black":"text-white"}`}>
                delete account
              </h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Setting;
