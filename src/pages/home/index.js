import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";
import BlockedUser from "../../components/BlockedUser";
import FriendRequest from "../../components/FriendRequest";
import Friends from "../../components/Friends";
import GroupList from "../../components/GroupList";
import Groups from "../../components/Groups";
import Search from "../../components/Search";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Home = () => {
  const navigate = useNavigate();

  let [fix,setFix] =useState(false)
  let user = useSelector((state) => state.loginUser.value);
  let dark = useSelector((state) => state.darkMode.value);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  // function setFixMenubar(){
  //   if(window.scrollY > 100){
  //     setFix(true)
  //   }else{
  //     setFix(false)
  //   }
  // }
  // window.addEventListener("scroll",setFixMenubar)

  useEffect(()=>{
    const handleScroll =()=>{
      setFix(window.scrollY >50)
      console.log(window.scrollY )
    }

    window.addEventListener("scroll", handleScroll)
    return ()=> window.removeEventListener("scroll",handleScroll)
  },[])


  
  return (
    <div className={`xl:flex justify-between  xl:p-0 ${dark?"bg-white":"bg-black"}`}>
      <div className="w-full hidden xl:w-[14%] xl:block">
        <Sidebar active="home" />
      </div>
      <div className="w-full xl:w-[84%] p-2.5  flex flex-wrap gap-x-5 gap-y-10">
        {/* search & friends */}
        <div className="w-full xl:w-[400px]">
          <Search />
          <Friends />
        </div>
        {/* user list  */}
        <div className="w-full xl:w-[334px]">
          <UserList />
        </div>
        {/* friends request */}
        <div className="w-full xl:w-[334px]">
          <FriendRequest />
        </div>
        {/* my group list */}
        <div className="w-full xl:w-[400px]">
          <Groups />
        </div>
        {/* group list */}
        <div className="w-full xl:w-[334px]">
          <GroupList />
        </div>
        {/* blocked list */}
        <div className="w-full xl:w-[334px]">
          <BlockedUser />
        </div>
      </div>
      {/* ${fix ?"fixed top-0 left-0":""} */}
      <div className={`w-full xl:hidden xl:w-[14%] block `}>
        <Sidebar active="home" />
      </div>
    </div>
  );
};

export default Home;
