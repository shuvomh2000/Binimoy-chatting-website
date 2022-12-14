import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome,AiOutlineSetting } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";

const Sidebar = ({active}) => {
  return (
    <div className="h-screen w-full rounded-br-[20px] rounded-tr-xl bg-primary">
      <div className="pt-[38px]">
        <div
          className="w-[100px] h-[100px] rounded-[50px] bg-white mx-auto
        "
        >
          <picture>
            <img
              className="object-cover"
              src="images/user1.png"
              loading="lazy"
            />
          </picture>
        </div>
        <ul className="mt-[78px] flex flex-col items-center overflow-x-hidden">
          <NavLink to='/'>
          <li
           className={`${
            active =="home" && 
            "py-[40px] relative z-10 after:absolute after:content-[''] after:bg-white after:top-0 after:left-[-80px] after:w-[292px] after:h-full after:z-[-1]  after:rounded-tl-[20px] after:rounded-bl-[20px] before:absolute before:content-[''] before:bg-primary before:top-0 before:right-[-171px] before:w-[9px] before:h-full before:rounded-[20px]"}`}>   
            <AiOutlineHome  className={`${active == "home" ? " text-[43px] text-primary":"text-[43px] text-white my-[40px]"}`}/>
          </li>
          </NavLink>
         <NavLink to="/message">
         <li
            className={`${
                active =="message" && 
                "py-[40px] relative z-10 after:absolute after:content-[''] after:bg-white after:top-0 after:left-[-80px] after:w-[292px] after:h-full after:z-[-1]  after:rounded-tl-[20px] after:rounded-bl-[20px] before:absolute before:content-[''] before:bg-primary before:top-0 before:right-[-171px] before:w-[9px] before:h-full before:rounded-[20px]"}`}>
            <BsChatDots className={`${active == "message" ? " text-[43px] text-primary":"  text-[43px] text-white my-[40px]"}`}/>
          </li>
         </NavLink>
          <NavLink to='/notification'>
          <li
            className={`${
                active =="notification" && 
                "py-[40px] relative z-10 after:absolute after:content-[''] after:bg-white after:top-0 after:left-[-80px] after:w-[292px] after:h-full after:z-[-1]  after:rounded-tl-[20px] after:rounded-bl-[20px] before:absolute before:content-[''] before:bg-primary before:top-0 before:right-[-171px] before:w-[9px] before:h-full before:rounded-[20px]"}`}>
            <IoMdNotificationsOutline className={`${active == "notification" ? " text-[43px] text-primary":"  text-[43px] text-white my-[40px]"}`}/>
          </li>
          </NavLink>
          <NavLink to="/setting">
          <li
            className={`${
                active =="setting" && 
                "py-[40px] relative z-10 after:absolute after:content-[''] after:bg-white after:top-0 after:left-[-80px] after:w-[292px] after:h-full after:z-[-1]  after:rounded-tl-[20px] after:rounded-bl-[20px] before:absolute before:content-[''] before:bg-primary before:top-0 before:right-[-171px] before:w-[9px] before:h-full before:rounded-[20px]"}`}>
            <AiOutlineSetting className={`${active == "setting" ? " text-[43px] text-primary":"  text-[43px] text-white my-[40px]"}`}/>
          </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
