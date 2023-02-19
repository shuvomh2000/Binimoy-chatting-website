import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {DarkMode} from "../slices/DarkMode";

const DarkLight = () => {
    const dispatch = useDispatch()
    let [dark,setDark] =useState(false)

    let handleDark = ()=>{
        setDark(!dark)
        dispatch(DarkMode(dark))
        localStorage.setItem("darkMode",JSON.stringify(dark))
    }
  return (
    <div onClick={handleDark} className={dark?"h-[20px] w-[50px] bg-white rounded-[50px] flex items-center":"h-[20px] w-[50px] bg-black rounded-[50px] flex items-center"}>
      <div className={dark?"h-[16px] w-[16px] bg-primary rounded-[50px] ml-auto ":"h-[16px] w-[16px] bg-primary rounded-[50px] mr-auto "}>
        </div>
    </div>
  );
};

export default DarkLight;
