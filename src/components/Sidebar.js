import React,{useEffect} from "react";
import {useNavigate, NavLink} from 'react-router-dom'
import { getAuth } from "firebase/auth";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({ active }) => {
  const auth = getAuth();
  const navigate = useNavigate()
  let currentUser = auth.currentUser
    
useEffect(()=>{
  if(!auth.currentUser){
    navigate("/login")
  }
},[])
  return (
    <div className="w-full xl:rounded-br-[20px] xl:rounded-tr-xl bg-primary fixed bottom-0 left-0 xl:static">
      <div className="xl:pt-[38px] flex xl:block justify-center">
        <div className="w-[50px] h-[50px] xl:w-[100px] xl:h-[100px] rounded-[50px] overflow-hidden bg-white xl:mx-auto my-auto">
          <picture>
            <img
              className="object-cover"
              // src="images/user.jpg"
              src={currentUser.photoURL}
              loading="lazy"
            />
          </picture>
        </div>
        {/* {curentUser.displayName} */}
        <h3 className="w-[80%] mx-auto text-center text-xl font-bold text-white font-nunito capitalize mt-[15px]">{currentUser.displayName}</h3>
        <ul className="xl:mt-[40px] flex xl:flex-col items-center overflow-x-hidden gap-x-[20px] px-7 xl:px-0">
          <NavLink to="/">
            <li
              className={`${
                active == "home" &&
                "xl:py-[25px] relative z-10 xl:after:absolute xl:after:content-[''] xl:after:bg-white xl:after:top-0 xl:left-0 xl:xl:after:left-[-45px] xl:after:w-[155px] xl:after:h-full xl:after:z-[-1] xl:after:rounded-tl-[20px] xl:after:rounded-bl-[20px] xl:before:absolute xl:before:content-[''] xl:before:bg-primary xl:before:top-0 xl:before:right-[-84px] xl:before:w-[9px] xl:before:h-full xl:before:rounded-[20px]  after:absolute after:content-[''] after:w-[45px] after:h-[45px] after:bg-white after:top-[-8px] after:left-[-10px]  after:z-[-1] after:rounded-[50%] xl:after:rounded-[0%] "
              }`}
            >
              <AiOutlineHome
                className={`${
                  active == "home"
                    ? "text-[25px] xl:text-[30px] text-primary"
                    : "text-[25px] xl:text-[30px] text-white my-[25px]"
                }`}
              />
            </li>
          </NavLink>
          <NavLink to="/message">
            <li
              className={`${
                active == "message" &&
                "xl:py-[25px] relative z-10 xl:after:absolute xl:after:content-[''] xl:after:bg-white xl:after:top-0 xl:left-0 xl:xl:after:left-[-45px] xl:after:w-[155px] xl:after:h-full xl:after:z-[-1] xl:after:rounded-tl-[20px] xl:after:rounded-bl-[20px] xl:before:absolute xl:before:content-[''] xl:before:bg-primary xl:before:top-0 xl:before:right-[-84px] xl:before:w-[9px] xl:before:h-full xl:before:rounded-[20px]  after:absolute after:content-[''] after:w-[45px] after:h-[45px] after:bg-white after:top-[-8px] after:left-[-10px]  after:z-[-1] after:rounded-[50%] xl:after:rounded-[0%]"
              }`}
            >
              <BsChatDots
                className={`${
                  active == "message"
                    ? "text-[25px] xl:text-[30px] text-primary"
                    : "text-[25px] xl:text-[30px] text-white my-[25px]"
                }`}
              />
            </li>
          </NavLink>
          <NavLink to="/notification">
            <li
              className={`${
                active == "notification" &&
                "xl:py-[25px] relative z-10 xl:after:absolute xl:after:content-[''] xl:after:bg-white xl:after:top-0 xl:left-0 xl:xl:after:left-[-45px] xl:after:w-[155px] xl:after:h-full xl:after:z-[-1] xl:after:rounded-tl-[20px] xl:after:rounded-bl-[20px] xl:before:absolute xl:before:content-[''] xl:before:bg-primary xl:before:top-0 xl:before:right-[-84px] xl:before:w-[9px] xl:before:h-full xl:before:rounded-[20px]  after:absolute after:content-[''] after:w-[45px] after:h-[45px] after:bg-white after:top-[-8px] after:left-[-10px]  after:z-[-1] after:rounded-[50%] xl:after:rounded-[0%]"
              }`}
            >
              <IoMdNotificationsOutline
                className={`${
                  active == "notification"
                    ? "text-[25px] xl:text-[30px] text-primary"
                    : "text-[25px] xl:text-[30px] text-white my-[25px]"
                }`}
              />
            </li>
          </NavLink>
          <NavLink to="/setting">
            <li
              className={`${
                active == "setting" &&
                "xl:py-[25px] relative z-10 xl:after:absolute xl:after:content-[''] xl:after:bg-white xl:after:top-0 xl:left-0 xl:xl:after:left-[-45px] xl:after:w-[155px] xl:after:h-full xl:after:z-[-1] xl:after:rounded-tl-[20px] xl:after:rounded-bl-[20px] xl:before:absolute xl:before:content-[''] xl:before:bg-primary xl:before:top-0 xl:before:right-[-84px] xl:before:w-[9px] xl:before:h-full xl:before:rounded-[20px]  after:absolute after:content-[''] after:w-[45px] after:h-[45px] after:bg-white after:top-[-8px] after:left-[-10px]  after:z-[-1] after:rounded-[50%] xl:after:rounded-[0%]"

                // "py-[25px] relative z-10 after:absolute after:content-[''] after:bg-white after:top-0 after:left-[-45px] after:w-[155px] after:h-full after:z-[-1]  after:rounded-tl-[20px] after:rounded-bl-[20px] before:absolute before:content-[''] before:bg-primary before:top-0 before:right-[-84px] before:w-[9px] before:h-full before:rounded-[20px]"
              }`}
            >
              <AiOutlineSetting
                className={`${
                  active == "setting"
                    ? "text-[25px] xl:text-[30px] text-primary"
                    : "text-[25px] xl:text-[30px] text-white my-[25px]"
                }`}
              />
            </li>
          </NavLink>
        </ul>
        <div className="xl:mt-[50px] flex justify-center items-center">
          <FiLogOut className="text-[30px] text-white"/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
