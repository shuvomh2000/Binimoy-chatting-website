import React, { useEffect } from 'react'
import {useNavigate, NavLink} from 'react-router-dom'
import { getAuth } from "firebase/auth";
import BlockedUser from '../../components/BlockedUser'
import FriendRequest from '../../components/FriendRequest'
import Friends from '../../components/Friends'
import GroupList from '../../components/GroupList'
import Groups from '../../components/Groups'
import Search from '../../components/Search'
import Sidebar from '../../components/Sidebar'
import UserList from '../../components/UserList'
import { useSelector } from 'react-redux';


const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  // const data = useSelector(state=>state.activeChat.value)
  // console.log(data)
  
  // useEffect(()=>{
  //   if(data == null){
  //     navigate("/login")
  //   }
  // },[])
  
  useEffect(()=>{
    if(!auth.currentUser){
      navigate("/login")
    }
  },[])
  

  return (
    <div className='flex justify-between p-2.5 xl:p-0'>
      <div className='xl:w-[14%]'>
        <Sidebar active="home"/>
      </div>
      <div className='xl:w-[84%] flex flex-wrap gap-x-5 gap-y-10'>
        {/* search & friends */}
        <div className='w-full xl:w-[425px]'>
          <Search/>
          <Friends/>
        </div>
        {/* user list  */}
        <div className='w-full xl:w-[334px]'>
          <UserList/>
        </div>
        {/* friends request */}
        <div className='w-full xl:w-[334px]'>
          <FriendRequest/>
        </div>
        {/* my group list */}
        <div className='w-full xl:w-[425px]'>
          <Groups/>
        </div>
        {/* group list */}
        <div className='w-full xl:w-[334px]'>
          <GroupList/>
        </div>
        {/* blocked list */}
        <div className='w-full xl:w-[334px]'>
          <BlockedUser/>
        </div>
      </div>
    </div>
    
  )
}

export default Home