import React from 'react'
import {NavLink} from 'react-router-dom'
import BlockedUser from '../../components/BlockedUser'
import FriendRequest from '../../components/FriendRequest'
import Friends from '../../components/Friends'
import GroupList from '../../components/GroupList'
import Groups from '../../components/Groups'
import Search from '../../components/Search'
import Sidebar from '../../components/Sidebar'
import UserList from '../../components/UserList'


const Home = () => {
  return (
    <div className='flex justify-between'>
      <div className='w-[14%]'>
        <Sidebar active="home"/>
      </div>
      <div className='w-[84%] flex flex-wrap gap-x-5 gap-y-10'>
        {/* search & friends */}
        <div className='w-[425px]'>
          <Search/>
          <Friends/>
        </div>
        {/* user list  */}
        <div className='w-[334px]'>
          <UserList/>
        </div>
        {/* friends request */}
        <div className='w-[334px]'>
          <FriendRequest/>
        </div>
        {/* my group list */}
        <div className='w-[425px]'>
          <Groups/>
        </div>
        {/* group list */}
        <div className='w-[334px]'>
          <GroupList/>
        </div>
        {/* blocked list */}
        <div className='w-[334px]'>
          <BlockedUser/>
        </div>
      </div>
    </div>
    
  )
}

export default Home