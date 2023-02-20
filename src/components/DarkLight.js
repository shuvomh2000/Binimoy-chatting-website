import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DarkMode } from "../slices/DarkMode";
import { useSelector } from "react-redux";

const DarkLight = () => {
  const dispatch = useDispatch();
  let [dark, setDark] = useState(false);
  // let darker = useSelector((state) => state.darkMode.value);

  let handleDark = () => {
    setDark(!dark);
    dispatch(DarkMode(dark));
    localStorage.setItem("darkMode", JSON.stringify(dark));
  };
  return (
    <div
      onClick={handleDark}
      className={`h-[20px] w-[50px] rounded-[50px] flex items-center px-[2px] ${
        dark ? "bg-white" : "bg-primary"
      }`}
    >
      <div
        className={`h-[16px] w-[16px] rounded-[50px] ${
          dark ? "ml-auto bg-primary" : "mr-auto bg-white"
        }`}
      ></div>
    </div>
  );
};

export default DarkLight;
